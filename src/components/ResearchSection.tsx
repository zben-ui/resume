"use client";

import { papers } from "@/data/papers";

export function ResearchSection() {
  return (
    <section id="research" className="mx-auto w-full max-w-[1100px] px-[6vw] pt-[18vh] pb-[12vh]">
      <p className="eyebrow">Research</p>
      <h2 className="mt-3 mb-10 text-4xl font-medium">论文</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {papers.map((paper) => (
          <article key={paper.id} className="border-t border-[var(--line)] pt-6">
            <p className="m-0 text-xs tracking-[0.18em] text-[var(--gold)]">{paper.venue}</p>
            <h3 className="mt-3 mb-3 text-3xl font-medium">{paper.code}</h3>
            <p className="m-0 font-[family-name:var(--latin)] text-sm leading-7 text-[var(--muted)]">{paper.title}</p>
            <p className="mt-4 text-[15px] leading-8">{paper.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
