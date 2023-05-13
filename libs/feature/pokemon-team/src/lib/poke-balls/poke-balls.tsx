"use client";

import { getUserTeam } from "@pokemon/db";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { PokeBall } from "../poke-ball/poke-ball";

interface PokeBallsProps {
  pokemon?: Awaited<ReturnType<typeof getUserTeam>>["pokemon"];
}

export function PokeBalls({ pokemon = [] }: PokeBallsProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="bg-gray-1 dark:bg-gray-2 ring-gray-3 mx-auto flex h-16 items-end justify-center gap-4 rounded-2xl px-4 pb-3 shadow-sm ring-1"
    >
      <AnimatePresence initial={false} mode="wait">
        {[...Array(6).keys()].map((i) => {
          const pokemonInPosition = pokemon.find((p) => p.position === i + 1);
          return <PokeBall key={i} mouseX={mouseX} pokemon={pokemonInPosition} />;
        })}
      </AnimatePresence>
    </motion.div>
  );
}
