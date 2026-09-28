"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      dot.style.display = "none";
      return;
    }
    document.body.classList.add("has-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target.closest("[data-hover]") : null;
      dot.classList.toggle("is-hot", Boolean(target));
    };

    const tick = () => {
      cx += (x - cx) * 0.35;
      cy += (y - cy) * 0.35;
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
