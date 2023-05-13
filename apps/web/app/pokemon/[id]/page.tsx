import { BASE_URL } from "@pokemon/configuration";
import { getAllPokemon, getSinglePokemon } from "@pokemon/db";
import { Pokemon } from "@pokemon/ui/server";
import { Metadata } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  return (
    <div className="mx-auto flex h-full flex-1 items-center justify-center p-6 sm:min-w-[425px] sm:max-w-[425px]">
      {/* @ts-expect-error Server component */}
      <Pokemon id={params.id} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ogUrl = new URL(`${BASE_URL}/api/og`);

  const { pokemon, types } = (await getSinglePokemon(Number.parseInt(params.id, 10))) ?? {};

  if (!pokemon || !types) {
    return {};
  }

  const title = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const description = `HP: ${pokemon.hp}. Attack: ${pokemon.attack}. Defense: ${pokemon.defense}. Special attack: ${pokemon.specialAttack}. Special defense: ${pokemon.specialDefense}. Speed: ${pokemon.speed}.`;

  ogUrl.searchParams.set("pokemon", title);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/pokemon/${params.id}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: pokemon.name,
        },
      ],
      tags: types.map((type) => type.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const pokemon = await getAllPokemon();

  return pokemon.map(({ pokemon: { id } }) => ({
    id: `${id}`,
  }));
}
