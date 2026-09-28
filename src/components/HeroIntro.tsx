"use client";

import { profile } from "@/data/resume";

export function HeroIntro() {
  return (
    <section data-stage="intro" className="intro-stage pointer-events-none absolute inset-0">
      <div className="intro-copy">
        <h1 data-beat data-motion="title" className="beat intro-name m-0">
          {profile.name}
        </h1>
        <div data-beat data-motion="rule" className="beat intro-rule" />
        <p data-beat data-motion="sub" className="beat intro-position m-0">
          {profile.positioning}
        </p>
        <p data-beat data-motion="meta" className="beat intro-directions m-0">
          {profile.directions.join(" · ")}
        </p>
        <p data-beat data-motion="whisper" className="beat intro-whisper m-0">
          {profile.line}
        </p>
      </div>
      <p data-hint className="scroll-hint m-0">
        {profile.scrollHint}
        <i aria-hidden="true">↓</i>
      </p>
    </section>
  );
}
