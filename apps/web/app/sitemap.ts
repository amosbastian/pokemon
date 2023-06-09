import { BASE_URL } from "@pokemon/configuration";
import { getAllPokemon } from "@pokemon/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPokemon = await getAllPokemon();

  return [
    {
      url: `${BASE_URL}/sign-in`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
    },
    ...allPokemon.map(({ pokemon }) => {
      return {
        url: `${BASE_URL}/pokemon/${pokemon.id}`,
        lastModified: new Date(),
      };
    }),
  ];
}
