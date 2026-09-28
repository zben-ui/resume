"use client";

import { profile } from "@/data/resume";
import { useState } from "react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const input = document.createElement("textarea");
      input.value = profile.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-[1100px] px-[6vw] pt-[8vh] pb-[18vh]">
      <p className="max-w-xl text-3xl leading-snug">{profile.contact}</p>
      <h2 className="mt-6 mb-2 text-5xl font-medium">{profile.name}</h2>
      <p className="text-sm tracking-[0.06em] text-[var(--quiet)]">{profile.finaleRoles}</p>
      <dl className="finale-job">
        {profile.job.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-lg">{profile.email}</p>
      <p className="text-[var(--muted)]">{profile.githubLabel}</p>
      <div className="mt-6 flex gap-8">
        <button type="button" data-hover className="bg-transparent p-0 text-sm tracking-[0.14em]" onClick={copyEmail}>
          {copied ? "已复制" : "复制邮箱"}
        </button>
        <a data-hover className="text-sm tracking-[0.14em]" href={profile.github} target="_blank" rel="noreferrer">
          访问 GitHub
        </a>
        <a data-hover className="text-sm tracking-[0.14em]" href={profile.resumeHref} download>
          下载我的简历
        </a>
      </div>
    </section>
  );
}
