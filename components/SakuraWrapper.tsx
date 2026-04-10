"use client";

import dynamic from "next/dynamic";

// Dynamically import so it only runs on client
const SakuraEffect = dynamic(() => import("./SakuraEffect"), { ssr: false });

export default function SakuraWrapper() {
  return <SakuraEffect />;
}
