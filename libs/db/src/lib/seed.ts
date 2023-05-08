import { db } from "./db";
import { pokemon, pokemonTypes, types } from "./schema";

export interface AllPokemonResponse {
  count: number;
  next: string;
  previous: any;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface PokemonResponse {
  height: number;
  id: number;
  name: string;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Sprites {
  front_default: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: StatDetail;
}

export interface StatDetail {
  name: "attack" | "hp" | "defense" | "special-attack" | "special-defense" | "speed";
  url: string;
}

export interface Type {
  slot: number;
  type: TypeDetail;
}

export interface TypeDetail {
  name: string;
  url: string;
}

export default async function seed() {
  const allPokemonResult = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000", { method: "GET" });
  const allPokemonResponse: AllPokemonResponse = await allPokemonResult.json();

  for (let i = 0; i < allPokemonResponse.results.length; i++) {
    const pokemonResult = await fetch(allPokemonResponse.results[i].url, { method: "GET" });
    const pokemonResponse: PokemonResponse = await pokemonResult.json();
    console.log(`Inserting ${pokemonResponse.name}...`);

    const hpStat = pokemonResponse.stats.find((stat) => stat.stat.name === "hp");
    const attackStat = pokemonResponse.stats.find((stat) => stat.stat.name === "attack");
    const defenseStat = pokemonResponse.stats.find((stat) => stat.stat.name === "defense");
    const specialAttackStat = pokemonResponse.stats.find((stat) => stat.stat.name === "special-attack");
    const specialDefenseStat = pokemonResponse.stats.find((stat) => stat.stat.name === "special-defense");
    const speedStat = pokemonResponse.stats.find((stat) => stat.stat.name === "speed");

    if (!pokemonResponse.sprites.front_default) {
      continue;
    }

    const values = {
      attack: attackStat!.base_stat,
      defense: defenseStat!.base_stat,
      height: pokemonResponse.height,
      hp: hpStat!.base_stat,
      name: pokemonResponse.name,
      specialAttack: specialAttackStat!.base_stat,
      specialDefense: specialDefenseStat!.base_stat,
      speed: speedStat!.base_stat,
      sprite: pokemonResponse.sprites.front_default,
      weight: pokemonResponse.weight,
      id: pokemonResponse.id,
    };

    db.insert(pokemon).values(values).onConflictDoUpdate({ target: pokemon.id, set: values }).run();

    for (let j = 0; j < pokemonResponse.types.length; j++) {
      const { type } = pokemonResponse.types[j];
      const pattern = /(\d+)\/$/;
      const match = type.url.match(pattern);
      const typeId = match ? Number.parseInt(match[1], 10) : null;

      if (!typeId) {
        continue;
      }

      db.insert(types)
        .values({ id: typeId, name: type.name })
        .onConflictDoUpdate({ target: types.id, set: { id: typeId, name: type.name } })
        .run();

      db.insert(pokemonTypes)
        .values({ pokemonId: pokemonResponse.id, typeId })
        // .onConflictDoUpdate({
        //   target: [pokemonTypes.pokemonId, pokemonTypes.typeId],
        //   set: { pokemonId: pokemonResponse.id, typeId },
        // })
        .run();
    }
  }
}

seed();
