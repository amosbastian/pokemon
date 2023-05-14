import { getSinglePokemon } from "@pokemon/db";
import { ImageResponse } from "next/server";

const WIDTH = 800;
const HEIGHT = 400;

const ColorMap: Record<string, string> = {
  normal: "bg-neutral-500 dark:bg-neutral-400",
  fighting: "bg-orange-500 dark:bg-orange-400",
  flying: "bg-sky-500 dark:bg-sky-400",
  poison: "bg-fuchsia-500 dark:bg-fuchsia-400",
  ground: "bg-amber-500 dark:bg-amber-400",
  rock: "bg-orange-500 dark:bg-orange-400",
  bug: "bg-lime-500 dark:bg-lime-400",
  ghost: "bg-violet-500 dark:bg-violet-400",
  steel: "bg-zinc-500 dark:bg-zinc-400",
  fire: "bg-red-500 dark:bg-red-400",
  water: "bg-blue-500 dark:bg-blue-400",
  grass: "bg-green-500 dark:bg-green-400",
  electric: "bg-yellow-500 dark:bg-yellow-400",
  psychic: "bg-pink-500 dark:bg-pink-400",
  ice: "bg-cyan-500 dark:bg-cyan-400",
  dragon: "bg-purple-500 dark:bg-purple-400",
  dark: "bg-gray-500 dark:bg-gray-400",
  fairy: "bg-pink-500 dark:bg-pink-400",
};

type Type = {
  id: number;
  name: string;
};

const PokemonType = ({ type }: { type: Type }) => {
  return (
    <span
      key={type.id}
      tw="dark:text-white text-white border border-gray-700 mr-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium capitalize"
    >
      <div tw={`h-1.5 w-1.5 rounded bg-gray-300 mr-1.5 ${ColorMap[type.name]}`} />
      {type.name}
    </span>
  );
};

type Statistic = "hp" | "attack" | "defense" | "specialAttack" | "specialDefense" | "speed";

const StatisticMap: Record<Statistic, { label: string; className: string }> = {
  hp: {
    label: "HP",
    className: "bg-red-500 border-red-600",
  },
  attack: {
    label: "Attack",
    className: "bg-orange-500 border-orange-600",
  },
  defense: {
    label: "Defense",
    className: "bg-yellow-500 border-yellow-600",
  },
  specialAttack: {
    label: "Special attack",
    className: "bg-blue-500 border-blue-600",
  },
  specialDefense: {
    label: "Special defense",
    className: "bg-green-500 border-green-600",
  },
  speed: {
    label: "Speed",
    className: "bg-pink-500 border-pink-600",
  },
};

const StatisticBar = ({ statistic, value }: { statistic: Statistic; value: number }) => {
  const width = (value / MAX_VALUE) * WIDTH;
  return (
    <div tw="flex items-center text-sm">
      <dt tw="flex flex-1 items-center">
        <p tw="text-white dark:text-white w-[110px] font-medium">{StatisticMap[statistic].label}</p>
        <div aria-hidden="true" tw="ml-1 flex flex-1 items-center">
          <div tw="relative ml-3 flex-1 flex flex-col">
            <div tw="border-gray-700 bg-gray-800 h-3 rounded-full border" />
            {value > 0 ? (
              <div
                tw={`absolute inset-y-0 rounded-full border ${StatisticMap[statistic].className} w-[calc(${value} / ${MAX_VALUE} * 100%)]`}
                style={{ width }}
              />
            ) : null}
          </div>
        </div>
      </dt>
      <dd tw="text-white dark:text-white ml-1 w-10 text-right text-sm ml-4">{value}</dd>
    </div>
  );
};

const MAX_VALUE = 255;

async function handler({ params }: { params: { id: string } }) {
  try {
    if (params.id) {
      const { pokemon, types } = (await getSinglePokemon(Number.parseInt(params.id, 10))) ?? {};

      if (!pokemon || !types) {
        return null;
      }

      return new ImageResponse(
        (
          <div tw="flex w-full flex-col gap-4 p-4 pr-0 text-white bg-zinc-900">
            <div tw="flex flex-row">
              <img
                tw="bg-gray-300 dark:bg-gray-4 h-16 w-16 flex-none rounded-full"
                src={pokemon.sprite}
                height={64}
                width={64}
                alt=""
              />
              <div tw="flex min-w-0 flex-auto mx-4 items-center">
                <div tw="flex items-center">
                  <p tw="text-white text-sm font-semibold capitalize mr-2">{pokemon.name}</p>
                  <div tw="h-0.5 w-0.5 rounded bg-gray-300" />
                  <p tw="text-gray-300 text-xs mx-2">{pokemon.weight} kg</p>
                  <div tw="h-0.5 w-0.5 rounded bg-gray-300" />
                  <p tw="text-gray-300 text-xs ml-2">{pokemon.height * 10} cm</p>
                </div>
                <div tw="ml-2 flex flex-wrap">
                  {types.map((type) => {
                    return <PokemonType key={type.id} type={type} />;
                  })}
                </div>
              </div>
            </div>
            <dl tw="flex flex-col">
              <StatisticBar statistic="hp" value={pokemon.hp} />
              <StatisticBar statistic="attack" value={pokemon.attack} />
              <StatisticBar statistic="defense" value={pokemon.defense} />
              <StatisticBar statistic="specialAttack" value={pokemon.specialAttack} />
              <StatisticBar statistic="specialDefense" value={pokemon.specialDefense} />
              <StatisticBar statistic="speed" value={pokemon.speed} />
            </dl>
          </div>
        ),
        {
          width: WIDTH,
          height: HEIGHT,
        },
      );
    }
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}

export default handler;
