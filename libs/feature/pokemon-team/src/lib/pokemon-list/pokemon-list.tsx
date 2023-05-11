import { nextAuthOptions } from "@pokemon/configuration/server";
import { getAllPokemon, getUserTeam } from "@pokemon/db";
import { ButtonLink, PokemonType } from "@pokemon/ui";
import { ChevronRightIcon, SearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { AddPokemon } from "../add-pokemon/add-pokemon";
import { PokeBalls } from "../poke-balls/poke-balls";
import { RemovePokemon } from "../remove-pokemon/remove-pokemon";

interface PokemonListProps {
  search?: string;
}

// React server components are async so you make database or API calls.
export async function PokemonList({ search }: PokemonListProps) {
  const session = await getServerSession(nextAuthOptions);

  const pokemon = getAllPokemon(search);
  const user = session && session.user;
  const team = user ? getUserTeam(user.id) : null;

  return (
    <>
      <ul className="divide-gray-3 dark:bg-gray-2 ring-gray-3 h-full max-h-full divide-y overflow-auto bg-white shadow-sm ring-1 sm:rounded-xl">
        {pokemon.length > 0 ? (
          pokemon.map(({ pokemon, types }) => {
            const inTeam = team ? team.pokemon.find((teamPokemon) => teamPokemon.id === pokemon.id) : false;
            const Action = inTeam ? RemovePokemon : AddPokemon;

            return (
              <li
                key={pokemon.id}
                className="hover:bg-gray-2 dark:hover:bg-gray-3 relative flex justify-between gap-x-6 px-4 py-5 sm:px-6"
              >
                <div className="flex gap-x-4">
                  <Image
                    className={`bg-gray-2 dark:bg-gray-4 h-12 w-12 flex-none rounded-full ${
                      inTeam ? "border border-red-600" : ""
                    }`}
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
                        return <PokemonType key={type.id} type={type} />;
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  {user ? (
                    <Action pokemonId={pokemon.id} userId={user.id} />
                  ) : (
                    <ButtonLink href="/sign-in">Add Pokémon</ButtonLink>
                  )}
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
    </>
  );
}
