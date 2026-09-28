"use client";

function GlowTitle({ children }: { children: string }) {
  return (
    <p data-beat data-motion="rise" className="beat crystal-title m-0">
      <span className="glow-text">
        <span>{children}</span>
      </span>
    </p>
  );
}

export function CrystalStage() {
  return (
    <>
      <section data-stage="crystalIn" className="pointer-events-none absolute inset-0">
        <div className="crystal-anchor crystal-anchor-single">
          <GlowTitle>我的成果</GlowTitle>
        </div>
      </section>
      <section data-stage="crystal" className="pointer-events-none absolute inset-0">
        <div className="crystal-anchor crystal-anchor-center">
          <GlowTitle>我的成果</GlowTitle>
        </div>
      </section>
    </>
  );
}
