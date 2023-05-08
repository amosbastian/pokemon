import { db, pokemonTable } from "@pokemon/db";
import { eq } from "drizzle-orm";

interface PokemonProps {
  id: number;
}

export async function Pokemon({ id }: PokemonProps) {
  const pokemon = db.select().from(pokemonTable).where(eq(pokemonTable.id, id)).get();

  return <div>{pokemon.name}</div>;
}
