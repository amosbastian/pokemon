import { db, pokemonTable } from "@pokemon/db";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const pokemonList = db.select().from(pokemonTable).all();

  return (
    <div>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">Example</div>
      <ul
        role="list"
        className="max-h-80 divide-y divide-gray-100 overflow-auto bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div className="flex gap-x-4">
              <Image
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={pokemon.sprite}
                height={48}
                width={48}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <Link href={`/pokemon/${pokemon.id}`}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {pokemon.name}
                  </Link>
                </p>
                <p className="relative mt-1 flex truncate text-xs leading-5 text-gray-500 hover:underline">
                  {pokemon.attack}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
