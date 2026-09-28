export type Achievement = {
  id: string;
  title: string;
  track: string;
  rank: string;
  rankLabel: string;
  role: string;
  points: string[];
  summary: string;
};

export const achievements: Achievement[] = [
  {
    id: "tianchi-eye",
    title: "阿里天池亚太眼科学会大数据竞赛",
    track: "2025 眼科手术视频 AI 分析赛道",
    rank: "11",
    rankLabel: "全球第11",
    role: "核心参与人员",
    points: ["基于 YOLO 进行手术器械识别", "结合器械位置信息进行手术阶段判断"],
    summary: "团队最终全球第 11 名。",
  },
  {
    id: "tianchi-defense",
    title: "阿里天池全球 AI 攻防挑战赛",
    track: "2025 AI 视频智能交互认证检测赛道",
    rank: "12",
    rankLabel: "全球第12",
    role: "团队成员",
    points: ["对抗样本生成", "模型鲁棒性优化", "Deepfake / 视频伪造检测", "完成 3 类攻击防御逻辑落地验证"],
    summary: "团队最终全球第 12 名。",
  },
  {
    id: "miccai",
    title: "MICCAI 2025",
    track: "SICS-155 白内障手术阶段识别挑战赛",
    rank: "04",
    rankLabel: "全球第4",
    role: "算法研发",
    points: ["医疗 AI 算法研发", "手术视频特征提取", "模型调优", "时间序列特征"],
    summary: "团队最终全球第 4 名。",
  },
];
