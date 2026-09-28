"use client";

import { skillGroups } from "@/data/skills";
import { FitBoard } from "./FitBoard";

function SkillColumn({ groups, title }: { groups: typeof skillGroups; title?: string }) {
  return (
    <div data-fit className="skill-copy">
      {title ? (
        <h2 data-beat data-motion="title" className="beat skill-heading m-0">
          {title}
        </h2>
      ) : null}
      {groups.map((group) => (
        <p key={group.id} data-beat data-motion="rise" className="beat skill-line">
          <strong>{group.title}</strong>
          {group.items.join("、")}
        </p>
      ))}
    </div>
  );
}

export function SkillsCluster() {
  const mid = Math.ceil(skillGroups.length / 2);
  return (
    <FitBoard stage="skills">
      <div className="skill-sheet">
        <SkillColumn title="技术能力" groups={skillGroups.slice(0, mid)} />
        <SkillColumn groups={skillGroups.slice(mid)} />
      </div>
    </FitBoard>
  );
}
