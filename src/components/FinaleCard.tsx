"use client";

import { useState } from "react";
import { profile } from "@/data/resume";

export function FinaleCard() {
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
    <section data-stage="finale" className="pointer-events-none absolute inset-0">
      <div className="finale-card">
        <p data-beat data-motion="title" className="beat finale-line m-0">
          {profile.contact}
        </p>
        <h2 data-beat data-motion="rise" className="beat finale-name m-0">
          {profile.name}
        </h2>
        <p data-beat data-motion="meta" className="beat finale-roles m-0">
          {profile.finaleRoles}
        </p>
        <dl data-beat data-motion="rise" className="beat finale-job">
          {profile.job.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="finale-contact">
          <p className="m-0">{profile.email}</p>
          <p className="m-0">{profile.githubLabel}</p>
        </div>
        <div className="finale-actions">
          <button type="button" data-hover onClick={copyEmail}>
            {copied ? "已复制" : "复制邮箱"}
          </button>
          <a data-hover href={profile.github} target="_blank" rel="noreferrer">
            访问 GitHub
          </a>
          <a data-hover href={profile.resumeHref} download>
            下载我的简历
          </a>
        </div>
      </div>
    </section>
  );
}
