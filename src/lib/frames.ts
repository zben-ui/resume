import { reels, type StageId } from "@/config/portfolio";

export type FrameManifest = {
  directory: string;
  prefix: string;
  pad: number;
  extension: string;
  count: number;
  first: string;
  last: string;
};

export function frameSrc(manifest: FrameManifest, index: number) {
  const safe = Math.min(manifest.count, Math.max(1, index));
  const name = `${manifest.prefix}${String(safe).padStart(manifest.pad, "0")}.${manifest.extension}`;
  return `${manifest.directory}/${name}?v=${manifest.count}`;
}

function clamp01(progress: number) {
  return Math.min(1, Math.max(0, progress));
}

export type ResolvedReel = {
  id: string;
  from: number;
  to: number;
  start: number;
  end: number;
  snap: number | null;
};

export function resolveReels(): ResolvedReel[] {
  const explicit = reels.reduce((sum, reel) => sum + (reel.span ?? 0), 0);
  const gapFrames = reels.reduce((sum, reel) => sum + (reel.span == null ? reel.to - reel.from + 1 : 0), 0);
  const unit = gapFrames > 0 ? (1 - explicit) / gapFrames : 0;
  let cursor = 0;
  return reels.map((reel, index) => {
    const span = reel.span ?? (reel.to - reel.from + 1) * unit;
    const start = cursor;
    const end = index === reels.length - 1 ? 1 : cursor + span;
    cursor += span;
    return {
      id: reel.id,
      from: reel.from,
      to: reel.to,
      start,
      end,
      snap: reel.snap ?? null,
    };
  });
}

function reelAtProgress(progress: number) {
  const list = resolveReels();
  return list.find((reel, index) => progress >= reel.start && (progress < reel.end || index === list.length - 1)) ?? list[0];
}

function reelAtFrame(frame: number) {
  const list = resolveReels();
  return list.find((reel) => frame >= reel.from && frame <= reel.to) ?? list[list.length - 1];
}

/** 帧号在滚动中的位置。吸附段落返回的是该帧所在区间内的线性位置。 */
export function progressForFrame(frame: number, count: number) {
  const index = Math.min(Math.max(1, count), Math.max(1, Math.round(frame)));
  const reel = reelAtFrame(index);
  if (reel.from === reel.to) return reel.snap != null ? reel.start + (reel.end - reel.start) * reel.snap : reel.start;
  const t = (index - reel.from) / (reel.to - reel.from);
  return reel.start + t * (reel.end - reel.start);
}

/** 导航和节点点击落到这段的吸附点，方便直接读完。 */
export function focusProgress(frame: number) {
  const reel = reelAtFrame(frame);
  if (reel.snap != null) return reel.start + (reel.end - reel.start) * reel.snap;
  return progressForFrame(frame, Math.max(frame, reel.to));
}

/** 每个有文字的章节一个落点。滚轮一次只去下一个。 */
export function textStops() {
  return resolveReels()
    .filter((reel) => reel.id !== "gap")
    .map((reel) => {
      const depth = reel.snap != null ? Math.max(reel.snap, 0.7) : 0.22;
      return reel.start + (reel.end - reel.start) * depth;
    });
}

export function nearestStop(progress: number) {
  const stops = textStops();
  let index = 0;
  let best = Infinity;
  stops.forEach((stop, i) => {
    const distance = Math.abs(stop - progress);
    if (distance < best) {
      best = distance;
      index = i;
    }
  });
  return index;
}

export function snapToProgress(progress: number) {
  const value = clamp01(progress);
  for (const reel of resolveReels()) {
    if (reel.snap == null) continue;
    const target = reel.start + (reel.end - reel.start) * reel.snap;
    if (value >= reel.start - 0.008 && value < target) return target;
    if (Math.abs(value - target) <= 0.012) return target;
  }
  return value;
}

export function stageRanges(_count: number) {
  const list = resolveReels();
  const pick = (id: StageId) => {
    const reel = list.find((item) => item.id === id);
    return { start: reel?.start ?? 0, end: reel?.end ?? 0 };
  };
  return {
    intro: pick("intro"),
    about: pick("about"),
    motive: pick("motive"),
    crystalIn: pick("crystalIn"),
    crystal: pick("crystal"),
    projects: pick("projects"),
    skills: pick("skills"),
    contest: pick("contest"),
    research: pick("research"),
    finale: pick("finale"),
  };
}

export function frameIndexFromProgress(progress: number, count: number) {
  const p = clamp01(progress);
  const total = Math.max(1, count);
  if (total <= 1) return 1;
  const reel = reelAtProgress(p);
  if (reel.from === reel.to) return Math.min(total, reel.from);
  const t = (p - reel.start) / Math.max(0.0001, reel.end - reel.start);
  return Math.min(total, reel.from + Math.round(Math.min(1, Math.max(0, t)) * (reel.to - reel.from)));
}

export function rangeOpacity(
  progress: number,
  start: number,
  end: number,
  fade = 0.04,
  holdEnd = false,
) {
  const finish = holdEnd ? end + 1 : end;
  if (progress >= finish) return 0;
  if (progress <= start) return start <= 0 ? 1 : 0;
  const fadeInEnd = Math.min(finish, start <= 0 ? start : start + fade);
  const fadeOutStart = Math.max(start, finish - fade);
  if (start > 0 && progress < fadeInEnd) {
    return (progress - start) / Math.max(0.0001, fadeInEnd - start);
  }
  if (!holdEnd && progress > fadeOutStart) {
    return (finish - progress) / Math.max(0.0001, finish - fadeOutStart);
  }
  return 1;
}

export function localProgress(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / Math.max(0.0001, end - start);
}

export function beatOpacity(local: number, at: number, duration = 0.16) {
  if (at <= 0) return 1;
  if (local <= at) return 0;
  if (local >= at + duration) return 1;
  return (local - at) / duration;
}

/** object-fit: cover，不拉伸。 */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  width: number,
  height: number,
  sourceWidth: number,
  sourceHeight: number,
) {
  const imageRatio = sourceWidth / sourceHeight;
  const canvasRatio = width / height;
  let dw = width;
  let dh = height;
  let dx = 0;
  let dy = 0;
  if (imageRatio > canvasRatio) {
    dh = height;
    dw = height * imageRatio;
    dx = (width - dw) / 2;
  } else {
    dw = width;
    dh = width / imageRatio;
    dy = (height - dh) / 2;
  }
  ctx.drawImage(image, dx, dy, dw, dh);
}
