"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** 内容高出视口时整体缩小，保证文字都留在画面里。 */
export function FitBoard({ stage, children }: { stage: string; children: ReactNode }) {
  const frameRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    const fit = () => {
      inner.style.transform = "none";
      const bounds = frame.getBoundingClientRect();
      const pieces = inner.querySelectorAll<HTMLElement>("[data-fit]");
      const nodes = pieces.length ? pieces : [inner];
      let top = Infinity;
      let bottom = 0;
      let left = Infinity;
      let right = 0;
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        top = Math.min(top, rect.top);
        bottom = Math.max(bottom, rect.bottom);
        left = Math.min(left, rect.left);
        right = Math.max(right, rect.right);
      });
      const topLimit = bounds.top + 72;
      const bottomLimit = bounds.bottom - 16;
      const leftLimit = bounds.left + 16;
      const rightLimit = bounds.right - 16;
      const scale = Math.min(
        1,
        (bottomLimit - topLimit) / Math.max(1, bottom - top),
        (rightLimit - leftLimit) / Math.max(1, right - left),
      );
      inner.style.transform = `scale(${Math.max(0.48, scale)})`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    window.addEventListener("resize", fit);
    const timer = window.setTimeout(fit, 400);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={frameRef} data-stage={stage} className="fit-frame">
      <div ref={innerRef} className="fit-scale">
        {children}
      </div>
    </section>
  );
}
