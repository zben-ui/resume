"use client";

export function LoadingScreen({ progress, failed }: { progress: number; failed?: boolean }) {
  const value = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  return (
    <div className="fixed inset-0 z-[70] flex items-end bg-[#090909] px-[6vw] pb-[10vh] text-[var(--ink)]">
      <div className="w-full max-w-md">
        <p className="m-0 text-4xl font-medium tracking-tight">赵奔</p>
        <p className="eyebrow mt-8 mb-4">{failed ? "无法读取序列帧" : "Loading"}</p>
        <div className="h-px w-full bg-white/15">
          <div className="h-px bg-[var(--gold)]" style={{ width: `${failed ? 0 : value}%` }} />
        </div>
        <p className="mt-3 font-[family-name:var(--latin)] text-xs tracking-[0.18em] text-[var(--quiet)]">
          {failed ? "请确认 public/frames 与 frames-manifest.json" : `${value}%`}
        </p>
      </div>
    </div>
  );
}
