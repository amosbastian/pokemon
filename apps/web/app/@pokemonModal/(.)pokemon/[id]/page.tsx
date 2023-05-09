import { InterceptDialog } from "@pokemon/ui";
import { Pokemon } from "@pokemon/ui/server";

export default async function Page({ params }: { params: { id: number } }) {
  return (
    <InterceptDialog>
      {/* @ts-expect-error Server component */}
      <Pokemon id={params.id} />
    </InterceptDialog>
  );
}
