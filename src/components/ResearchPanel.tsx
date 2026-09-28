"use client";

import { papers } from "@/data/papers";
import { FitBoard } from "./FitBoard";

export function ResearchPanel() {
  return (
    <FitBoard stage="research">
      <div className="board">
      <div data-fit className="board-card">
        <p data-beat data-motion="title" className="beat eyebrow m-0 mb-2">
          科研成果
        </p>
        <article data-beat data-motion="rise" className="beat contest-card">
          <p className="m-0 text-xs tracking-[0.18em] text-[var(--gold)]">{papers[0].venue}</p>
          <h3 className="mt-2 mb-1 text-[26px]">{papers[0].code}</h3>
          <p className="m-0 font-[family-name:var(--latin)] text-[13px] leading-5 text-[var(--ink)]">{papers[0].title}</p>
          <p className="mt-2 mb-0 text-[14px] leading-6">{papers[0].summary}</p>
        </article>
      </div>
      <div />
      <div data-fit className="board-card">
        <article data-beat data-motion="rise" className="beat contest-card">
          <p className="m-0 text-xs tracking-[0.18em] text-[var(--gold)]">{papers[1].venue}</p>
          <h3 className="mt-2 mb-1 text-[26px]">{papers[1].code}</h3>
          <p className="m-0 font-[family-name:var(--latin)] text-[13px] leading-5 text-[var(--ink)]">{papers[1].title}</p>
          <p className="mt-2 mb-0 text-[14px] leading-6">{papers[1].summary}</p>
        </article>
      </div>
      </div>
    </FitBoard>
  );
}
