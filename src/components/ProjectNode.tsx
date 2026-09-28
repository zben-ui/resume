"use client";

import { projects, projectsIntro } from "@/data/projects";
import { FitBoard } from "./FitBoard";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article data-beat data-motion="rise" className="beat project-card">
      <p className="m-0 font-[family-name:var(--latin)] text-xs tracking-[0.16em] text-[var(--gold)]">
        {project.index}
      </p>
      <h3 className="mt-1 mb-1">{project.title}</h3>
      <p className="m-0 text-[13px] leading-5 text-[var(--ink)]">{project.subtitle}</p>
      <p className="mt-1.5 mb-0 text-[13px] leading-5">{project.summary}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
      <ol className="project-flow">
        {project.flow.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>
      <p className="mt-1.5 mb-0 text-[13px] leading-5">{project.outcome}</p>
      <a data-hover className="mt-1.5 inline-block text-[13px] tracking-[0.12em] text-[var(--gold)]" href={project.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
    </article>
  );
}

export function ProjectNode() {
  const [left, right] = [projects.slice(0, 2), projects.slice(2)];
  return (
    <FitBoard stage="projects">
      <div className="board">
      <div data-fit className="board-card">
        <h2 data-beat data-motion="title" className="beat m-0 text-[24px] leading-none">
          {projectsIntro.title}
        </h2>
        <p data-beat data-motion="sub" className="beat mt-2 mb-1 text-[14px] text-[var(--ink)]">
          {projectsIntro.subtitle}
        </p>
        {left.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div />
      <div data-fit className="board-card">
        {right.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      </div>
    </FitBoard>
  );
}
