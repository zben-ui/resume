"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/config/portfolio";
import { frameSrc, type FrameManifest } from "@/lib/frames";

type Cache = Map<number, HTMLImageElement>;

async function runPool(items: number[], limit: number, worker: (index: number) => Promise<void>) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const current = items[cursor];
      cursor += 1;
      await worker(current);
    }
  });
  await Promise.all(runners);
}

export function useFrameSequence() {
  const cacheRef = useRef<Cache>(new Map());
  const inflightRef = useRef<Set<number>>(new Set());
  const targetRef = useRef(1);
  const manifestRef = useRef<FrameManifest | null>(null);
  const [manifest, setManifest] = useState<FrameManifest | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const cache = cacheRef.current;
    const inflight = inflightRef.current;

    const loadOne = (index: number, total: number, source: FrameManifest) => {
      if (index < 1 || index > total || cache.has(index) || inflight.has(index)) {
        return Promise.resolve();
      }
      inflight.add(index);
      return new Promise<void>((resolve) => {
        const image = new Image();
        image.decoding = "async";
        const finish = () => {
          inflight.delete(index);
          resolve();
        };
        image.onload = () => {
          cache.set(index, image);
          finish();
        };
        image.onerror = finish;
        image.src = frameSrc(source, index);
      });
    };

    const boot = async () => {
      try {
        const response = await fetch("/frames-manifest.json", { cache: "no-cache" });
        if (!response.ok) throw new Error("manifest");
        const data = (await response.json()) as FrameManifest;
        if (cancelled) return;
        manifestRef.current = data;
        setManifest(data);

        const priority = Math.min(experience.priorityFrames, data.count);
        await loadOne(1, data.count, data);
        if (cancelled) return;
        setProgress(1 / priority);

        const rest = Array.from({ length: Math.max(0, priority - 1) }, (_, i) => i + 2);
        let done = 1;
        await runPool(rest, 4, async (index) => {
          await loadOne(index, data.count, data);
          done += 1;
          if (!cancelled) setProgress(done / priority);
        });
        if (cancelled) return;
        setReady(true);

        const keep = experience.lookBehind + experience.lookAhead + 24;
        while (!cancelled) {
          const center = targetRef.current;
          const around: number[] = [];
          for (let index = center - experience.lookBehind; index <= center + experience.lookAhead; index += 1) {
            around.push(index);
          }
          const missing = around.filter(
            (index) => index >= 1 && index <= data.count && !cache.has(index) && !inflight.has(index),
          );
          if (missing.length) {
            await runPool(missing.slice(0, 8), 6, (index) => loadOne(index, data.count, data));
          } else {
            await new Promise((resolve) => setTimeout(resolve, 80));
          }
          if (cache.size > keep) {
            const ranked = [...cache.keys()].sort((a, b) => Math.abs(b - center) - Math.abs(a - center));
            ranked.slice(0, cache.size - keep).forEach((index) => {
              if (Math.abs(index - center) > experience.lookBehind + 4) cache.delete(index);
            });
          }
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    const guard = window.setTimeout(() => {
      if (!cancelled && cache.has(1)) setReady(true);
    }, 8000);

    void boot();
    return () => {
      cancelled = true;
      window.clearTimeout(guard);
    };
  }, []);

  const nearest = (index: number) => {
    const cache = cacheRef.current;
    const total = manifestRef.current?.count ?? 1;
    const safe = Math.min(total, Math.max(1, index));
    if (cache.has(safe)) return cache.get(safe) ?? null;
    for (let distance = 1; distance < total; distance += 1) {
      const previous = cache.get(safe - distance);
      if (previous) return previous;
      const next = cache.get(safe + distance);
      if (next) return next;
    }
    return null;
  };

  return {
    manifest,
    ready,
    failed,
    loadProgress: progress,
    targetRef,
    cacheRef,
    nearest,
  };
}
