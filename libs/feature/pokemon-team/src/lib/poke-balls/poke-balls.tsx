"use client";

import { motion, useMotionValue } from "framer-motion";
import { PokeBall } from "../poke-ball/poke-ball";

export function PokeBalls() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="bg-gray-1 dark:bg-gray-2 ring-gray-3 mx-auto flex h-16 items-end justify-center gap-4 rounded-2xl px-4 pb-3 shadow-sm ring-1"
    >
      {[...Array(6).keys()].map((i) => (
        <PokeBall mouseX={mouseX} key={i} />
      ))}
    </motion.div>
  );
}
