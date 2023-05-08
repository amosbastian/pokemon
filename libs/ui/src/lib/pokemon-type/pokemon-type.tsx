export const ColorMap: Record<string, string> = {
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

type Type = {
  id: number;
  name: string;
};

export const PokemonType = ({ type }: { type: Type }) => {
  return (
    <span
      key={type.id}
      className="text-slate-12 ring-gray-4 inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium capitalize ring-1 ring-inset"
    >
      <svg className={`h-1.5 w-1.5 ${ColorMap[type.name]}`} viewBox="0 0 6 6" aria-hidden="true">
        <circle cx={3} cy={3} r={3} />
      </svg>
      {type.name}
    </span>
  );
};
