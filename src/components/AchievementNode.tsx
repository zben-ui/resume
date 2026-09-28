"use client";

import { crystalNodes, type NodeId } from "@/config/portfolio";
import { progressForFrame } from "@/lib/frames";

export function AchievementNode({
  active,
  count,
  onOpen,
}: {
  active: NodeId | null;
  count: number;
  onOpen: (id: NodeId) => void;
}) {
  return (
    <div data-stage="crystal" className="absolute inset-0">
      {crystalNodes.map((node) => (
        <button
          key={node.id}
          type="button"
          data-hover
          data-node={node.id}
          data-appear={progressForFrame(node.appearFrame, count)}
          className={`node ${active === node.id ? "is-hot" : ""}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onClick={() => onOpen(node.id)}
        >
          <i />
          <span className="glow-text">
            <span>{node.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
