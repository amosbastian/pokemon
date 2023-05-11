"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import * as React from "react";
import styles from "./poke-ball.module.css";

export function PokeBall({ mouseX }: { mouseX: MotionValue }) {
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
      style={{ width: pokeBallWidth }}
      className={`bg-gray-4 relative z-50 aspect-square w-10 rounded-full ${styles.pokeball}`}
    />
  );
}
