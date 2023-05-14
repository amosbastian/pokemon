import { db, typesTable } from "@pokemon/db";
import { PokemonList } from "@pokemon/feature/pokemon-team/server";
import { PokemonTypesComboBox, Search } from "@pokemon/ui";

export default async function Page({ searchParams }: { searchParams: { search?: string; type?: string } }) {
  const search = searchParams.search;
  const type = searchParams.type;
  const types = await db.select().from(typesTable).all();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Search defaultValue={search} />
        <PokemonTypesComboBox defaultValue={type} types={types} />
      </div>
      {/* @ts-expect-error Server component */}
      <PokemonList search={search} type={type} />
    </>
  );
}
