"use client";

import { getUserTeam } from "@pokemon/db";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import * as React from "react";
import styles from "./poke-ball.module.css";

interface PokeBallProps {
  mouseX: MotionValue;
  pokemon?: Awaited<ReturnType<typeof getUserTeam>>["pokemon"][number];
}

export function PokeBall({ mouseX, pokemon }: PokeBallProps) {
  const pokemonSprite = pokemon?.sprite;
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const pokeballWidthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  const pokeBallWidth = useSpring(pokeballWidthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{
        width: pokeBallWidth,
        backgroundImage: pokemonSprite ? `url(${pokemonSprite})` : undefined,
        backgroundPosition: pokemonSprite ? "center" : undefined,
        backgroundSize: pokemonSprite ? "40px" : undefined,
        backgroundRepeat: pokemonSprite ? "no-repeat" : undefined,
      }}
      key={pokemonSprite}
      initial={{ y: pokemonSprite ? 20 : 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: pokemonSprite ? -20 : 0, opacity: 0 }}
      transition={{ duration: 1 }}
      className={`bg-gray-4 relative z-50 aspect-square w-10 rounded-full ${pokemonSprite ? "" : styles.pokeball}`}
    />
  );
}
