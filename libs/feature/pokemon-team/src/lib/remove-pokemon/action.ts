import { db, getSinglePokemon, getUserTeam, pokemonTeamsTable } from "@pokemon/db";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const MIN_POKEMON = 0;

const removePokemonSchema = zfd.formData({
  userId: zfd.text(z.string().min(1)),
  pokemonId: zfd.numeric(z.number().min(1)),
});

export async function removePokemon(formData: FormData) {
  "use server";
  const input = removePokemonSchema.parse(formData);
  const team = await getUserTeam(input.userId);

  if (!team) {
    throw new Error(`Could not find user ${input.userId}'s team`);
  }

  if (team.pokemon.length === MIN_POKEMON) {
    throw new Error(`You don't have any Pokémon in your team!`);
  }

  const inTeam = team.pokemon.find((pokemon) => pokemon.id === input.pokemonId);

  if (!inTeam) {
    throw new Error(`This Pokémon is not in your team`);
  }

  const { pokemon } = (await getSinglePokemon(input.pokemonId)) ?? {};

  if (!pokemon) {
    throw new Error(`Pokémon with ID ${input.pokemonId} does not exist`);
  }

  db.delete(pokemonTeamsTable)
    .where(and(eq(pokemonTeamsTable.pokemonId, input.pokemonId), eq(pokemonTeamsTable.teamId, team.id)))
    .run();

  revalidateTag("user-team");
}
