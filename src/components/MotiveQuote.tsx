"use client";

import { profile } from "@/data/resume";

export function MotiveQuote() {
  return (
    <section data-stage="motive" className="pointer-events-none absolute inset-0">
      <div className="quote-frame">
        <p data-beat data-motion="rise" className="beat quote-lead m-0">
          {profile.motiveLead}
        </p>
        <p data-beat data-motion="title" className="beat quote-emphasis m-0">
          {profile.motiveEmphasis}
        </p>
      </div>
    </section>
  );
}
