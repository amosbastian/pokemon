import * as Database from "better-sqlite3";
import { InferModel, eq, placeholder, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { pokemonTable, pokemonTeamsTable, pokemonTypesTable, teamsTable, typesTable } from "./schema";

type Pokemon = InferModel<typeof pokemonTable>;
type Type = InferModel<typeof typesTable>;

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "./libs/db/src/lib/drizzle" });

export const getSinglePokemon = (id: number) => {
  const rows = db
    .select({
      pokemon: pokemonTable,
      type: typesTable,
    })
    .from(pokemonTable)
    .leftJoin(pokemonTypesTable, eq(pokemonTypesTable.pokemonId, pokemonTable.id))
    .leftJoin(typesTable, eq(typesTable.id, pokemonTypesTable.typeId))
    .where(eq(pokemonTable.id, id))
    .all();

  const result = rows.reduce<Record<number, { pokemon: Pokemon; types: Type[] }>>((accumulator, row) => {
    const pokemon = row.pokemon;
    const type = row.type;

    if (!accumulator[pokemon.id]) {
      accumulator[pokemon.id] = { pokemon, types: [] };
    }

    if (type) {
      accumulator[pokemon.id].types.push(type);
    }

    return accumulator;
  }, {});

  return result[id] ? result[id] : null;
};

export const getAllPokemon = (search?: string) => {
  let pokemonList: { pokemon: Pokemon; type: Type | null }[];

  // TODO: figure out better where to do conditional .where()
  if (search) {
    pokemonList = db
      .select({
        pokemon: pokemonTable,
        type: typesTable,
      })
      .from(pokemonTable)
      .leftJoin(pokemonTypesTable, eq(pokemonTypesTable.pokemonId, pokemonTable.id))
      .leftJoin(typesTable, eq(pokemonTypesTable.typeId, typesTable.id))
      .where(sql`lower(${pokemonTable.name}) like ${placeholder("name")}`)
      .prepare()
      .all({ name: `%${search}%` });
  } else {
    pokemonList = db
      .select({
        pokemon: pokemonTable,
        type: typesTable,
      })
      .from(pokemonTable)
      .leftJoin(pokemonTypesTable, eq(pokemonTypesTable.pokemonId, pokemonTable.id))
      .leftJoin(typesTable, eq(pokemonTypesTable.typeId, typesTable.id))
      .all();
  }

  const reducedPokemonList = pokemonList.reduce<Record<number, { pokemon: Pokemon; types: Type[] }>>(
    (accumulator, row) => {
      const pokemon = row.pokemon;
      const type = row.type;

      if (!accumulator[pokemon.id]) {
        accumulator[pokemon.id] = { pokemon, types: [] };
      }

      if (type) {
        accumulator[pokemon.id].types.push(type);
      }

      return accumulator;
    },
    {},
  );

  return Object.values(reducedPokemonList);
};

export const getUserTeam = (userId: string) => {
  const rows = db
    .select({
      team: teamsTable,
      pokemon: pokemonTable,
      position: pokemonTeamsTable.position,
    })
    .from(teamsTable)
    .where(eq(teamsTable.userId, userId))
    .leftJoin(pokemonTeamsTable, eq(pokemonTeamsTable.teamId, teamsTable.id))
    .leftJoin(pokemonTable, eq(pokemonTable.id, pokemonTeamsTable.pokemonId))
    .all();

  const pokemon = rows.reduce<(Pokemon & { position: number })[]>((accumulator, row) => {
    const pokemon = row.pokemon;
    const position = row.position;

    if (pokemon && position) {
      accumulator.push({ ...pokemon, position });
    }

    return accumulator;
  }, []);

  return {
    ...rows[0].team,
    pokemon,
  };
};
