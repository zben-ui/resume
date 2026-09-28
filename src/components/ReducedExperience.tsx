"use client";

import { useState } from "react";
import { achievements } from "@/data/achievements";
import { projects, projectsIntro, type Project } from "@/data/projects";
import { education, profile } from "@/data/resume";
import { skillGroups } from "@/data/skills";
import { ContactSection } from "./ContactSection";
import { ProjectModal } from "./ProjectModal";
import { ResearchSection } from "./ResearchSection";

export function ReducedExperience() {
  const [project, setProject] = useState<Project | null>(null);

  return (
    <main className="bg-[#090909]">
      <section className="relative h-screen min-h-[640px]">
        <img src="/frames/frame_0001.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="scrim-left absolute inset-0" />
        <div className="copy-block relative z-10 flex h-full flex-col justify-center">
          <h1 className="m-0 text-7xl font-medium">{profile.name}</h1>
          <p className="mt-4 text-3xl">{profile.positioning}</p>
          <p className="mt-6 text-sm tracking-[0.08em] text-[var(--quiet)]">{profile.directions.join(" · ")}</p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-[rgba(244,240,232,0.4)]">{profile.line}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1100px] gap-12 px-[6vw] py-24 md:grid-cols-2">
        <div>
          <p className="text-3xl">{profile.greeting}</p>
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-8 text-[var(--muted)]">
              {paragraph}
            </p>
          ))}
        </div>
        <ul className="m-0 list-none p-0">
          {profile.portraitTags.map((tag) => (
            <li key={tag} className="border-t border-[var(--line)] py-4 text-sm tracking-[0.04em]">
              {tag}
            </li>
          ))}
        </ul>
        <dl className="archive md:col-span-2">
          <dt>学校</dt>
          <dd>
            {education.school} · {education.major}
          </dd>
          <dt>{education.labLabel}</dt>
          <dd>{education.lab}</dd>
          <dt>{education.scoreLabel}</dt>
          <dd>{education.score}</dd>
          <dt>{education.honorLabel}</dt>
          <dd>{education.honors.join(" · ")}</dd>
        </dl>
      </section>
      <section className="mx-auto max-w-[1100px] px-[6vw] pb-20">
        <h2 className="text-3xl font-medium">竞赛</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {achievements.map((item) => (
            <article key={item.id} className="border-t border-[var(--line)] pt-4">
              <p className="rank text-5xl">{item.rank}</p>
              <h3 className="mt-3 text-lg">{item.title}</h3>
              <p className="text-sm text-[var(--muted)]">{item.track}</p>
              <p className="text-sm">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-[6vw] pb-16">
        <h2 className="text-3xl font-medium">能力</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article key={group.id}>
              <h3 className="text-base">{group.title}</h3>
              <p className="text-sm leading-7 text-[var(--muted)]">{group.items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-[6vw] pb-8">
        <h2 className="text-3xl font-medium">{projectsIntro.title}</h2>
        <div className="mt-6">
          {projects.map((item) => (
            <button key={item.id} type="button" className="project-row" onClick={() => setProject(item)}>
              <span className="text-[var(--gold)]">{item.index}</span>
              <span>
                {item.title}
                <span className="mt-1 block text-sm text-[var(--muted)]">{item.subtitle}</span>
              </span>
              <span className="text-sm text-[var(--quiet)]">查看</span>
            </button>
          ))}
        </div>
      </section>
      <ResearchSection />
      <ContactSection />
      <ProjectModal project={project} onClose={() => setProject(null)} />
    </main>
  );
}
