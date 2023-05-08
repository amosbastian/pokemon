import { PokemonDialog } from "@pokemon/ui";
import { Pokemon } from "@pokemon/ui/server";

export default async function Page({ params }: { params: { id: number } }) {
  return (
    // @ts-expect-error Server component
    <PokemonDialog>
      {/* @ts-expect-error Server component */}
      <Pokemon id={params.id} />
    </PokemonDialog>
  );
}
