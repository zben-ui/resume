"use client";

import { forwardRef } from "react";

export const FrameSequence = forwardRef<HTMLCanvasElement>(function FrameSequence(_, ref) {
  return <canvas ref={ref} className="stage-canvas" aria-label="赵奔数字展厅" />;
});
