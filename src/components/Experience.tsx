"use client";

import { useEffect, useRef, useState } from "react";
import { crystalNodes, experience, navItems, type NodeId, type StageId } from "@/config/portfolio";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import {
  drawCover,
  frameIndexFromProgress,
  focusProgress,
  nearestStop,
  rangeOpacity,
  stageRanges,
  textStops,
} from "@/lib/frames";
import { AboutOverlay } from "./AboutOverlay";
import { AchievementDetail } from "./AchievementDetail";
import { AchievementNode } from "./AchievementNode";
import { CrystalStage } from "./CrystalStage";
import { FinaleCard } from "./FinaleCard";
import { MotiveQuote } from "./MotiveQuote";
import { Cursor } from "./Cursor";
import { FrameSequence } from "./FrameSequence";
import { HeroIntro } from "./HeroIntro";
import { LoadingScreen } from "./LoadingScreen";
import { ProjectNode } from "./ProjectNode";
import { ResearchPanel } from "./ResearchPanel";
import { SkillsCluster } from "./SkillsCluster";
import { TopNavigation } from "./TopNavigation";

const motionSpec = {
  title: { y: 26, blur: 8, scale: 0.965, duration: 0.28 },
  rule: { y: 0, blur: 0, scale: 1, duration: 0.32 },
  sub: { y: 18, blur: 5, scale: 1, duration: 0.24 },
  meta: { y: 12, blur: 2, scale: 1, duration: 0.22 },
  whisper: { y: 8, blur: 0, scale: 1, duration: 0.2 },
  rise: { y: 16, blur: 4, scale: 1, duration: 0.24 },
} as const;

function iosIn(elapsed: number, delay: number, duration = 0.55) {
  const t = (elapsed - delay) / duration;
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - (1 - t) ** 3;
}

function paint(root: HTMLElement, progress: number, count: number, now: number) {
  const ranges = stageRanges(count);
  root.querySelectorAll<HTMLElement>("[data-stage]").forEach((stage) => {
    const id = stage.dataset.stage as StageId;
    const range = ranges[id];
    const span = Math.max(0.0001, range.end - range.start);
    const fade = Math.min(span * 0.2, id === "about" || id === "intro" ? 0.012 : 0.016);
    const opacity = rangeOpacity(progress, range.start, range.end, fade);
    stage.style.opacity = String(opacity);
    stage.style.visibility = opacity < 0.02 ? "hidden" : "visible";
    const inside = progress >= range.start && progress < range.end + 0.001;
    if (inside && stage.dataset.armed !== "1") {
      stage.dataset.armed = "1";
      stage.dataset.armedAt = String(now);
    } else if (!inside && opacity < 0.05) {
      stage.dataset.armed = "0";
    }
    const elapsed = stage.dataset.armed === "1" ? (now - Number(stage.dataset.armedAt || now)) / 1000 : 0;
    stage.querySelectorAll<HTMLElement>("[data-beat]").forEach((line, index) => {
      const motion = motionSpec[line.dataset.motion as keyof typeof motionSpec] ?? motionSpec.rise;
      const amount = iosIn(elapsed, index * 0.09, motion.duration + 0.28);
      const travel = 1 - amount;
      line.style.opacity = String(amount);
      if (line.dataset.motion === "rule") {
        line.style.transform = `scaleX(${amount})`;
      } else {
        line.style.transform = `translate3d(0, ${travel * motion.y}px, 0) scale(${1 - travel * (1 - motion.scale)})`;
      }
      line.style.filter = motion.blur > 0 ? `blur(${travel * motion.blur}px)` : "none";
      if (line.dataset.motion === "title") {
        line.style.letterSpacing = `${0.04 - amount * 0.06}em`;
      }
    });
    stage.querySelectorAll<HTMLElement>("[data-hint]").forEach((hint) => {
      const hintAmount = iosIn(elapsed, 0.45, 0.45);
      hint.style.opacity = String(hintAmount);
      hint.style.transform = `translate3d(0, ${(1 - hintAmount) * 8}px, 0)`;
    });
  });

  root.querySelectorAll<HTMLElement>("[data-node]").forEach((node) => {
    const appear = Number(node.dataset.appear || 0);
    const amount = Math.max(0, Math.min(1, (progress - appear) / 0.012));
    node.style.opacity = String(amount);
  });
}

function labelFor(progress: number, count: number) {
  const ranges = stageRanges(count);
  if (progress >= ranges.finale.start) return "联系";
  if (progress >= ranges.research.start) return "研究";
  if (progress >= ranges.contest.start) return "成就";
  if (progress >= ranges.skills.start) return "能力";
  if (progress >= ranges.projects.start) return "项目";
  return "关于";
}

export function Experience() {
  const { manifest, ready, failed, loadProgress, targetRef, cacheRef } = useFrameSequence();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const releasedRef = useRef(false);
  const sectionRef = useRef("");
  const triggerRef = useRef<{ start: number; end: number } | null>(null);
  const [released, setReleased] = useState(false);
  const [active, setActive] = useState("关于");
  const activeRef = useRef("关于");
  const [panel, setPanel] = useState<NodeId | null>(null);
  const goToRef = useRef<(progress: number) => void>(() => {});

  useEffect(() => {
    if (!ready || !spacerRef.current) return;
    let dead = false;
    const contextRef: { current: { revert: () => void } | null } = { current: null };
    let removeWheel = () => {};

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (dead || !spacerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      contextRef.current = gsap.context(() => {
        const trigger = ScrollTrigger.create({
          id: "sequence",
          trigger: spacerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
          onLeave: () => {
            releasedRef.current = false;
          },
          onEnterBack: () => {
            releasedRef.current = false;
            setReleased(false);
          },
        });
        triggerRef.current = trigger;

        const stops = textStops();
        let tween: { kill: () => void } | null = null;
        let wheelLock = false;
        const goTo = (progress: number) => {
          const y = trigger.start + (trigger.end - trigger.start) * progress;
          tween?.kill();
          wheelLock = true;
          const proxy = { y: window.scrollY };
          tween = gsap.to(proxy, {
            y,
            duration: 1.05,
            ease: "power2.inOut",
            onUpdate: () => window.scrollTo(0, proxy.y),
            onComplete: () => {
              wheelLock = false;
            },
          });
        };
        goToRef.current = goTo;

        const onWheel = (event: WheelEvent) => {
          event.preventDefault();
          if (wheelLock) return;
          if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return;
          const dir = event.deltaY > 0 || event.deltaX > 0 ? 1 : -1;
          const current = nearestStop(progressRef.current);
          const next = Math.max(0, Math.min(stops.length - 1, current + dir));
          if (next === current) return;
          goTo(stops[next]);
        };
        window.addEventListener("wheel", onWheel, { passive: false });
        removeWheel = () => {
          window.removeEventListener("wheel", onWheel);
          tween?.kill();
        };
      });
    })();

    return () => {
      dead = true;
      removeWheel();
      contextRef.current?.revert();
      triggerRef.current = null;
      goToRef.current = () => {};
    };
  }, [ready]);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  useEffect(() => {
    if (!manifest) return;
    const canvas = canvasRef.current;
    const ui = uiRef.current;
    const context = canvas?.getContext("2d", { alpha: false }) ?? canvas?.getContext("2d");
    if (!canvas || !context || !ui) return;

    let frame = 0;
    let lastToken = "";
    let dirty = true;

    const nearest = (index: number) => {
      const cache = cacheRef.current;
      const total = manifest.count;
      const safe = Math.min(total, Math.max(1, index));
      if (cache.has(safe)) return cache.get(safe) ?? null;
      for (let distance = 1; distance < total; distance += 1) {
        const previous = cache.get(safe - distance);
        if (previous) return previous;
      }
      return cache.get(1) ?? null;
    };

    const render = () => {
      const progress = progressRef.current;
      const index = frameIndexFromProgress(progress, manifest.count);
      targetRef.current = index;
      const image = nearest(index);
      if (image && image.naturalWidth) {
        const dpr = Math.min(window.devicePixelRatio || 1, experience.maxDpr);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const bufferWidth = Math.round(width * dpr);
        const bufferHeight = Math.round(height * dpr);
        if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
          canvas.width = bufferWidth;
          canvas.height = bufferHeight;
          dirty = true;
        }
        const token = cacheRef.current.has(index) ? String(index) : image.src;
        if (dirty || token !== lastToken) {
          dirty = false;
          lastToken = token;
          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          context.fillStyle = "#090909";
          context.fillRect(0, 0, width, height);
          drawCover(context, image, width, height, image.naturalWidth, image.naturalHeight);
        }
      }

      if (!releasedRef.current) {
        paint(ui, progress, manifest.count, performance.now());
      }
      const label = releasedRef.current
        ? sectionRef.current === "contact"
          ? "联系"
          : sectionRef.current === "research"
            ? "研究"
            : "项目"
        : labelFor(progress, manifest.count);
      if (label !== activeRef.current) {
        activeRef.current = label;
        setActive(label);
      }
      frame = requestAnimationFrame(render);
    };

    const onResize = () => {
      dirty = true;
    };
    paint(ui, progressRef.current, manifest.count, performance.now());
    window.addEventListener("resize", onResize);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [cacheRef, manifest, targetRef]);

  useEffect(() => {
    const nodes = ["research", "contact"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        sectionRef.current = visible ? visible.target.id : "";
      },
      { threshold: [0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jump = (item: (typeof navItems)[number]) => {
    setPanel(null);
    if (item.href) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const progress = item.frame != null ? focusProgress(item.frame) : null;
    if (progress == null) return;
    goToRef.current(progress);
  };

  const openNode = (id: NodeId) => {
    const node = crystalNodes.find((item) => item.id === id);
    if (!node) return;
    jump({ label: node.label, frame: node.focusFrame });
  };

  return (
    <main>
      <FrameSequence ref={canvasRef} />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[#090909] transition-opacity duration-700"
        style={{ opacity: released ? 0.78 : 0 }}
      />
      <div ref={spacerRef} style={{ height: `${experience.scrollVh}vh` }} />
      <div ref={uiRef} className={`stage-ui ${released ? "is-released" : ""}`}>
        <HeroIntro />
        <AboutOverlay />
        <MotiveQuote />
        <CrystalStage />
        <AchievementNode active={panel} count={manifest?.count ?? 359} onOpen={openNode} />
        <ProjectNode />
        <SkillsCluster />
        <AchievementDetail />
        <ResearchPanel />
        <FinaleCard />
      </div>
      <TopNavigation active={active} onJump={jump} />
      <Cursor />
      {ready ? null : <LoadingScreen progress={failed ? 0 : loadProgress} failed={failed} />}
    </main>
  );
}
