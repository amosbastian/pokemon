"use client";

import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./poke-ball.module.css";

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

function PokeBall({ mouseX }: { mouseX: MotionValue }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const pokeballWidthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  const pokeBallWidth = useSpring(pokeballWidthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width: pokeBallWidth }}
      className={`bg-gray-4 relative z-50 aspect-square w-10 rounded-full ${styles.pokeball}`}
    />
  );
}
