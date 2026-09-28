"use client";

import { navItems } from "@/config/portfolio";
import { profile } from "@/data/resume";

export function TopNavigation({
  active,
  onJump,
}: {
  active: string;
  onJump: (item: (typeof navItems)[number]) => void;
}) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[4.5vw] py-6">
      <span className="font-[family-name:var(--latin)] text-sm tracking-[0.18em]">{profile.mark}</span>
      <nav className="pointer-events-auto flex gap-6" aria-label="页面">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            data-hover
            data-nav={item.label}
            onClick={() => onJump(item)}
            className={`bg-transparent p-0 text-[12px] tracking-[0.16em] ${
              active === item.label ? "text-[var(--ink)]" : "text-[var(--quiet)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
