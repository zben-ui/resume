"use client";

import type { Project } from "@/data/projects";
import { useEffect } from "react";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-scrim" onClick={onClose} role="presentation">
      <article
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <p className="eyebrow m-0">{project.index}</p>
          <button type="button" data-hover className="bg-transparent text-sm text-[var(--quiet)]" onClick={onClose}>
            关闭
          </button>
        </div>
        <h2 className="mt-4 mb-2 text-4xl font-medium">{project.title}</h2>
        <p className="m-0 text-[var(--muted)]">{project.subtitle}</p>
        <p className="mt-6 text-[15px] leading-8">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
        <ol className="mt-8 list-none space-y-2 p-0 text-sm leading-7 text-[var(--muted)]">
          {project.flow.map((step, index) => (
            <li key={step}>
              <span className="mr-3 font-[family-name:var(--latin)] text-[var(--gold)]">0{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm leading-7">{project.outcome}</p>
        <a
          data-hover
          className="mt-8 inline-block border-b border-[var(--gold)] pb-1 text-sm tracking-[0.12em]"
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </article>
    </div>
  );
}
