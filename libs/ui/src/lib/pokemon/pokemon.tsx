import { db, pokemonTable, pokemonTypesTable, typesTable } from "@pokemon/db";
import { InferModel, eq } from "drizzle-orm";
import Image from "next/image";
import { PokemonType } from "../pokemon-type/pokemon-type";

type Pokemon = InferModel<typeof pokemonTable>;
type Type = InferModel<typeof typesTable>;

type Statistic = "hp" | "attack" | "defense" | "specialAttack" | "specialDefense" | "speed";

const StatisticMap: Record<Statistic, { label: string; className: string }> = {
  hp: {
    label: "HP",
    className: "bg-red-6 border-red-6",
  },
  attack: {
    label: "Attack",
    className: "bg-orange-6 border-orange-6",
  },
  defense: {
    label: "Defense",
    className: "bg-yellow-6 border-yellow-6",
  },
  specialAttack: {
    label: "Special attack",
    className: "bg-blue-6 border-blue-6",
  },
  specialDefense: {
    label: "Special defense",
    className: "bg-green-6 border-green-6",
  },
  speed: {
    label: "Speed",
    className: "bg-pink-6 border-pink-6",
  },
};

const StatisticBar = ({ statistic, value }: { statistic: Statistic; value: number }) => {
  return (
    <div className="flex items-center text-sm">
      <dt className="flex flex-1 items-center">
        <p className="text-gray-12 w-[110px] font-medium">{StatisticMap[statistic].label}</p>
        <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
          <div className="relative ml-3 flex-1">
            <div className="border-gray-6 bg-gray-2 h-3 rounded-full border" />
            {value > 0 ? (
              <div
                className={`absolute inset-y-0 rounded-full border ${StatisticMap[statistic].className}`}
                style={{ width: `calc(${value} / ${MAX_VALUE} * 100%)` }}
              />
            ) : null}
          </div>
        </div>
      </dt>
      <dd className="text-gray-12 ml-1 w-10 text-right text-sm tabular-nums">{value}</dd>
    </div>
  );
};

const MAX_VALUE = 255;

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

interface PokemonProps {
  id: number;
}

export async function Pokemon({ id }: PokemonProps) {
  const rows = db
    .select({
      pokemon: pokemonTable,
      type: typesTable,
    })
    .from(pokemonTable)
    .leftJoin(pokemonTypesTable, eq(pokemonTypesTable.pokemonId, pokemonTable.id))
    .leftJoin(typesTable, eq(typesTable.id, pokemonTypesTable.typeId))
    .where(eq(pokemonTable.id, id))
    .all();

  const result = rows.reduce<Record<number, { pokemon: Pokemon; types: Type[] }>>((accumulator, row) => {
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

  const { pokemon, types } = result[id];

  if (!pokemon || !types) {
    return null;
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-row gap-4">
        <Image
          className="bg-gray-2 dark:bg-gray-4 h-12 w-12 flex-none rounded-full"
          src={pokemon.sprite}
          height={48}
          width={48}
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <div className="flex items-center gap-x-2 leading-5">
            <p className="text-slate-12 text-sm font-semibold capitalize leading-6">{pokemon.name}</p>
            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
              <circle cx={1} cy={1} r={1} />
            </svg>
            <p className="text-gray-11 text-xs">{pokemon.weight} kg</p>
            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
              <circle cx={1} cy={1} r={1} />
            </svg>
            <p className="text-gray-11 text-xs">{pokemon.height * 10} cm</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-2">
            {types.map((type) => {
              return <PokemonType key={type.id} type={type} />;
            })}
          </div>
        </div>
      </div>
      <dl className="space-y-3">
        <StatisticBar statistic="hp" value={pokemon.hp} />
        <StatisticBar statistic="attack" value={pokemon.attack} />
        <StatisticBar statistic="defense" value={pokemon.defense} />
        <StatisticBar statistic="specialAttack" value={pokemon.specialAttack} />
        <StatisticBar statistic="specialDefense" value={pokemon.specialDefense} />
        <StatisticBar statistic="speed" value={pokemon.speed} />
      </dl>
    </div>
  );
}
