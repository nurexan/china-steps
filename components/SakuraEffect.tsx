"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  dur: string;
  delay: string;
  size: number;
}

export default function SakuraEffect() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const arr: Petal[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      dur: `${7 + Math.random() * 8}s`,
      delay: `${Math.random() * 12}s`,
      size: 10 + Math.random() * 10,
    }));
    setPetals(arr);
  }, []);

  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="sakura"
          style={{
            left: p.left,
            animationDuration: p.dur,
            animationDelay: p.delay,
            width: `${p.size}px`,
            height: `${p.size * 0.7}px`,
          }}
        />
      ))}
    </>
  );
}
