"use client";

import { profile } from "@/data/resume";

export function AboutOverlay() {
  return (
    <section data-stage="about" className="portrait-stage pointer-events-none absolute inset-0">
      <div className="portrait-left">
        <h2 data-beat data-motion="title" className="beat portrait-greeting m-0">
          {profile.greeting}
        </h2>
        <p data-beat data-motion="rise" className="beat portrait-body m-0">
          {profile.about[0]}
        </p>
      </div>
      <ul className="portrait-right m-0 list-none p-0">
        {profile.portraitTags.map((tag) => (
          <li key={tag} data-beat data-motion="rise" className="beat portrait-tag">
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}
