import { db, typesTable } from "@pokemon/db";
import { PokemonList } from "@pokemon/feature/pokemon-team/server";
import { PokemonTypesComboBox, Search } from "@pokemon/ui";

export default async function Page({ searchParams }: { searchParams: { search?: string } }) {
  const search = searchParams.search;
  const types = db.select().from(typesTable).all();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Search defaultValue={search} />
        <PokemonTypesComboBox types={types} />
      </div>
      {/* @ts-expect-error Server component */}
      <PokemonList search={search} />
    </>
  );
}
