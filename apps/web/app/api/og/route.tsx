import { getSinglePokemon } from "@pokemon/db";
import { ImageResponse } from "@vercel/og";
import * as z from "zod";

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
    className: "bg-red-200 border-red-600",
  },
  attack: {
    label: "Attack",
    className: "bg-orange-200 border-orange-600",
  },
  defense: {
    label: "Defense",
    className: "bg-yellow-200 border-yellow-600",
  },
  specialAttack: {
    label: "Special attack",
    className: "bg-blue-200 border-blue-600",
  },
  specialDefense: {
    label: "Special defense",
    className: "bg-green-200 border-green-600",
  },
  speed: {
    label: "Speed",
    className: "bg-pink-200 border-pink-600",
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
            <div tw="border-gray-200 bg-gray-300 h-3 rounded-full border" />
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

const ogImageSchema = z.object({
  heading: z.string().optional(),
  pokemonId: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams));

    let heading = "Default heading";

    if (values.pokemonId) {
      const { pokemon, types } = (await getSinglePokemon(Number.parseInt(values.pokemonId, 10))) ?? {};

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

    if (values.heading) {
      heading = values.heading.length > 140 ? `${values.heading.substring(0, 140)}...` : values.heading;
    }

    const fontSize = heading.length > 100 ? "70px" : "100px";

    return new ImageResponse(
      (
        <div tw="flex relative flex-col p-12 w-full h-full items-start text-white bg-zinc-900">
          <img
            tw="bg-gray-300 dark:bg-gray-4 h-16 w-16 flex-none rounded-full"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            height={64}
            width={64}
            alt=""
          />
          <div tw="flex flex-col flex-1 py-10">
            <div
              tw="flex leading-[1.1] text-[80px] font-bold"
              style={{
                fontFamily: "InterBold",
                fontWeight: "bold",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              {heading}
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl" style={{ fontFamily: "Inter", fontWeight: "normal" }}>
              pokemon-rsc.vercel.app
            </div>
            <div tw="flex items-center text-xl" style={{ fontFamily: "Inter", fontWeight: "normal" }}>
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path
                  d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 36c-9.02 4-10-4-14-4"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div tw="flex ml-2">github.com/amosbastian/pokemon</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
