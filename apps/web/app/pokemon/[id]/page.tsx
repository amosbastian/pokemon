import { Pokemon } from "@pokemon/ui/server";

export default async function Page({ params }: { params: { id: number } }) {
  // @ts-expect-error Server component
  return <Pokemon id={params.id} />;
}
