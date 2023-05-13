import { getSinglePokemon } from "@pokemon/db";
import Image from "next/image";
import { PokemonType } from "../pokemon-type/pokemon-type";

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

interface PokemonProps {
  id: number;
}

export async function Pokemon({ id }: PokemonProps) {
  const { pokemon, types } = (await getSinglePokemon(id)) ?? {};

  if (!pokemon || !types) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4">
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
