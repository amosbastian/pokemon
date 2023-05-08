import { db, pokemonTable, pokemonTypesTable, typesTable } from "@pokemon/db";
import { PokeBalls, Search } from "@pokemon/ui";
import { InferModel, eq, placeholder, sql } from "drizzle-orm";
import { ChevronRightIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Pokemon = InferModel<typeof pokemonTable>;
type Type = InferModel<typeof typesTable>;

const ColorMap: Record<string, string> = {
  normal: "fill-neutral-500 dark:fill-neutral-400",
  fighting: "fill-orange-500 dark:fill-orange-400",
  flying: "fill-sky-500 dark:fill-sky-400",
  poison: "fill-fuchsia-500 dark:fill-fuchsia-400",
  ground: "fill-amber-500 dark:fill-amber-400",
  rock: "fill-orange-500 dark:fill-orange-400",
  bug: "fill-lime-500 dark:fill-lime-400",
  ghost: "fill-violet-500 dark:fill-violet-400",
  steel: "fill-zinc-500 dark:fill-zinc-400",
  fire: "fill-red-500 dark:fill-red-400",
  water: "fill-blue-500 dark:fill-blue-400",
  grass: "fill-green-500 dark:fill-green-400",
  electric: "fill-yellow-500 dark:fill-yellow-400",
  psychic: "fill-pink-500 dark:fill-pink-400",
  ice: "fill-cyan-500 dark:fill-cyan-400",
  dragon: "fill-purple-500 dark:fill-purple-400",
  dark: "fill-gray-500 dark:fill-gray-400",
  fairy: "fill-pink-500 dark:fill-pink-400",
};

export default async function Page({ searchParams }: { searchParams: { search?: string } }) {
  const search = searchParams.search;

  let pokemonList: { pokemon: Pokemon; type: Type | null }[];

  // TODO: figure out better where to do conditional .where()
  if (search) {
    pokemonList = db
      .select({
        pokemon: pokemonTable,
        type: typesTable,
      })
      .from(pokemonTable)
      .leftJoin(pokemonTypesTable, eq(pokemonTypesTable.pokemonId, pokemonTable.id))
      .leftJoin(typesTable, eq(pokemonTypesTable.typeId, typesTable.id))
      .where(sql`lower(${pokemonTable.name}) like ${placeholder("name")}`)
      .prepare()
      .all({ name: `%${search}%` });
  } else {
    pokemonList = db
      .select({
        pokemon: pokemonTable,
        type: typesTable,
      })
      .from(pokemonTable)
      .leftJoin(pokemonTypesTable, eq(pokemonTypesTable.pokemonId, pokemonTable.id))
      .leftJoin(typesTable, eq(pokemonTypesTable.typeId, typesTable.id))
      .all();
  }

  const result = pokemonList.reduce<Record<number, { pokemon: Pokemon; types: Type[] }>>((accumulator, row) => {
    const pokemon = row.pokemon;
    const type = row.type;

    if (!accumulator[pokemon.id]) {
      accumulator[pokemon.id] = { pokemon, types: [] };
    }

    if (type) {
      accumulator[pokemon.id].types.push(type);
    }

    return accumulator;
  }, {});

  const pokemon = Object.values(result);

  return (
    <div className="grid h-full grid-rows-[max-content_minmax(0px,_1fr)_max-content] gap-4">
      <Search defaultValue={search} />
      <ul
        role="list"
        className="divide-gray-3 dark:bg-gray-2 ring-gray-3 h-full max-h-full divide-y overflow-auto bg-white shadow-sm ring-1 sm:rounded-xl"
      >
        {pokemon.length > 0 ? (
          pokemon.map(({ pokemon, types }) => {
            return (
              <li
                key={pokemon.id}
                className="hover:bg-gray-2 dark:hover:bg-gray-3 relative flex justify-between gap-x-6 px-4 py-5 sm:px-6"
              >
                <div className="flex gap-x-4">
                  <Image
                    className="bg-gray-2 dark:bg-gray-4 h-12 w-12 flex-none rounded-full"
                    src={pokemon.sprite}
                    height={48}
                    width={48}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-slate-12 text-sm font-semibold capitalize leading-6">
                      <Link href={`/pokemon/${pokemon.id}`}>
                        <span className="absolute inset-x-0 -top-px bottom-0" />
                        {pokemon.name}
                      </Link>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-2">
                      {types.map((type) => {
                        return (
                          <span
                            key={type.id}
                            className="text-slate-12 ring-gray-4 inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                          >
                            <svg className={`h-1.5 w-1.5 ${ColorMap[type.name]}`} viewBox="0 0 6 6" aria-hidden="true">
                              <circle cx={3} cy={3} r={3} />
                            </svg>
                            {type.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <ChevronRightIcon className="text-slate-11 h-5 w-5 flex-none" aria-hidden="true" />
                </div>
              </li>
            );
          })
        ) : (
          <li className="flex h-full flex-col items-center justify-center">
            <SearchIcon className="text-gray-11 mx-auto h-12 w-12" aria-hidden="true" />
            <h3 className="text-gray-12 mt-2 text-sm font-semibold">No Pokémon</h3>
          </li>
        )}
      </ul>
      <PokeBalls />
    </div>
  );
}
