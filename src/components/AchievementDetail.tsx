"use client";

import { achievements } from "@/data/achievements";
import { FitBoard } from "./FitBoard";

function ContestCard({ item }: { item: (typeof achievements)[number] }) {
  return (
    <article data-beat data-motion="rise" className="beat contest-card">
      <div className="flex items-end justify-between gap-3">
        <p className="rank m-0">{item.rank}</p>
        <p className="m-0 text-xs tracking-[0.16em] text-[var(--gold)]">{item.rankLabel}</p>
      </div>
      <h3 className="mt-1 mb-0.5 text-[16px] leading-snug">{item.title}</h3>
      <p className="m-0 text-[13px] leading-5 text-[var(--ink)]">{item.track}</p>
      <p className="mt-1 mb-0 text-xs tracking-[0.12em] text-[var(--quiet)]">{item.role}</p>
      <ul className="m-0 mt-1.5 list-none space-y-0.5 p-0 text-[13px] leading-5">
        {item.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p className="mt-1.5 mb-0 text-[13px] leading-5">{item.summary}</p>
    </article>
  );
}

export function AchievementDetail() {
  return (
    <FitBoard stage="contest">
      <div className="board">
      <div data-fit className="board-card">
        <p data-beat data-motion="title" className="beat eyebrow m-0 mb-2">
          竞赛成果
        </p>
        <ContestCard item={achievements[0]} />
        <ContestCard item={achievements[1]} />
      </div>
      <div />
      <div data-fit className="board-card">
        <ContestCard item={achievements[2]} />
      </div>
      </div>
    </FitBoard>
  );
}
