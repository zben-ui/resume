/**
 * 全站滚动与阶段的唯一配置。
 * 改这里即可，不必到各个组件里找百分比。
 *
 * 按真实帧号对齐。带 span 的段落会在滚动里停留，并在 snap 处吸附。
 * 没写 span 的段落用来播过中间的空镜，共用剩余滚动。
 */
export const experience = {
  /** 序列滚动区的总高度。越大，同样的滚轮走得越慢。 */
  scrollVh: 720,
  /**
   * 滚轮和画面之间的轻微跟随。
   * true = 完全跟手，松手立刻停。
   * 数字越小越跟手，0.2 左右只有很短的缓冲。
   */
  scrub: 0.15 as number | boolean,
  /** 优先加载的开头帧数（含第 1 帧）。30fps 下盖住开场。 */
  priorityFrames: 36,
  /** 当前帧前后额外预取的范围。30fps 下窗口大约覆盖下一次滚轮。 */
  lookBehind: 10,
  lookAhead: 40,
  /** 设备像素比上限，避免 3x 屏把画布撑得过大。 */
  maxDpr: 2,
};

export type Reel = {
  id: StageId | "gap";
  from: number;
  to: number;
  /** 这段占整段滚动的比例。不写则按帧数分剩余进度。 */
  span?: number;
  /** 吸附点在本段内的位置，0–1。 */
  snap?: number;
};

export const reels: Reel[] = [
  { id: "intro", from: 1, to: 24, span: 0.1 },
  { id: "about", from: 25, to: 28, span: 0.064, snap: 0.78 },
  { id: "motive", from: 29, to: 40, span: 0.052, snap: 0.64 },
  { id: "crystalIn", from: 41, to: 48, span: 0.04, snap: 0.72 },
  { id: "crystal", from: 49, to: 110, span: 0.078, snap: 0.42 },
  { id: "gap", from: 111, to: 166 },
  { id: "projects", from: 167, to: 190, span: 0.076, snap: 0.5 },
  { id: "gap", from: 191, to: 218 },
  { id: "skills", from: 219, to: 240, span: 0.07, snap: 0.5 },
  { id: "gap", from: 241, to: 272 },
  { id: "contest", from: 273, to: 296, span: 0.076, snap: 0.46 },
  { id: "gap", from: 297, to: 328 },
  { id: "research", from: 329, to: 344, span: 0.066, snap: 0.52 },
  { id: "gap", from: 345, to: 358 },
  { id: "finale", from: 359, to: 359, span: 0.07, snap: 0.68 },
];

export type StageId =
  | "intro"
  | "about"
  | "motive"
  | "crystalIn"
  | "crystal"
  | "projects"
  | "skills"
  | "contest"
  | "research"
  | "finale";

/**
 * 每个阶段内部，文字块出现的局部进度（0–1）。
 * 只影响该阶段内的淡入顺序。
 */
export const beats = {
  intro: [0, 0.04, 0.22, 0.4, 0.52],
  about: [0, 0.16, 0.34, 0.48, 0.6],
  motive: [0, 0.28],
  crystalIn: [0.12],
  crystal: [0.08],
  projects: [0, 0.16],
  skills: [0],
  contest: [0],
  research: [0],
  finale: [0, 0.14, 0.28, 0.42],
};

export type NodeId = "contest" | "skills" | "research" | "projects";

/** 晶体周围的文字。x / y 是相对画面的百分比。 */
export const crystalNodes: {
  id: NodeId;
  label: string;
  x: number;
  y: number;
  appearFrame: number;
  /** 点击后吸附到这一帧的详情。 */
  focusFrame: number;
}[] = [
  { id: "projects", label: "项目实践", x: 40, y: 15, appearFrame: 51, focusFrame: 175 },
  { id: "skills", label: "技术能力", x: 64, y: 30, appearFrame: 55, focusFrame: 227 },
  { id: "contest", label: "竞赛成果", x: 13, y: 44, appearFrame: 59, focusFrame: 281 },
  { id: "research", label: "科研成果", x: 34, y: 70, appearFrame: 63, focusFrame: 335 },
];

export const navItems: {
  label: string;
  frame?: number;
  href?: string;
}[] = [
  { label: "关于", frame: 27 },
  { label: "能力", frame: 227 },
  { label: "成就", frame: 281 },
  { label: "项目", frame: 175 },
  { label: "研究", frame: 335 },
  { label: "联系", frame: 359 },
];
