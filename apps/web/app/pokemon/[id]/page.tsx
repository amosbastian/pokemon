import { Pokemon } from "@pokemon/ui/server";

export default async function Page({ params }: { params: { id: number } }) {
  return (
    <div className="mx-auto flex h-full flex-1 items-center justify-center p-6 sm:min-w-[425px] sm:max-w-[425px]">
      {/* @ts-expect-error Server component */}
      <Pokemon id={params.id} />
    </div>
  );
}
