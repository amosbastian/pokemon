import { db, getSinglePokemon, getUserTeam, pokemonTeamsTable } from "@pokemon/db";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const MAX_POKEMON = 6;

const addPokemonSchema = zfd.formData({
  userId: zfd.text(z.string().min(1)),
  pokemonId: zfd.numeric(z.number().min(1)),
  position: zfd.numeric(z.number().nullable()),
});

export async function addPokemon(formData: FormData) {
  "use server";
  const input = addPokemonSchema.parse(formData);
  const team = await getUserTeam(input.userId);

  if (!team) {
    throw new Error(`Could not find user ${input.userId}'s team`);
  }

  if (team.pokemon.length >= 6) {
    throw new Error(`You can have a maximum of ${MAX_POKEMON} Pokémon in your team!`);
  }

  const inTeam = team.pokemon.find((pokemon) => pokemon.id === input.pokemonId);

  if (inTeam) {
    throw new Error(`${inTeam.name.charAt(0).toUpperCase() + inTeam.name.slice(1)} is already in your team`);
  }

  const { pokemon } = (await getSinglePokemon(input.pokemonId)) ?? {};

  if (!pokemon) {
    throw new Error(`Pokémon with ID ${input.pokemonId} does not exist`);
  }

  if (!input.position) {
    throw new Error("Something went wrong!");
  }

  db.insert(pokemonTeamsTable).values({ pokemonId: input.pokemonId, teamId: team.id, position: input.position }).run();

  revalidateTag("user-team");
}
