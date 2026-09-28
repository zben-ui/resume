"use client";

import { useEffect, useState } from "react";
import { Experience } from "./Experience";
import { LoadingScreen } from "./LoadingScreen";
import { ReducedExperience } from "./ReducedExperience";

export function Site() {
  const [reduce, setReduce] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  if (reduce === null) return <LoadingScreen progress={0} />;
  if (reduce) return <ReducedExperience />;
  return <Experience />;
}
