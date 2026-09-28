export type Paper = {
  id: string;
  code: string;
  title: string;
  summary: string;
  venue: string;
};

export const papers: Paper[] = [
  {
    id: "rcn-net",
    code: "RCN-Net",
    title: "A ROI-Guided Co-Attention Normalization-Free Network for Cataract Surgery Phase Recognition",
    summary: "面向白内障手术阶段识别的 ROI 引导式无归一化协同注意力网络。",
    venue: "CVIP 2025",
  },
  {
    id: "tsmm",
    code: "TSMM",
    title: "Spatiotemporal Multi-branch Module for Deepfake Detection",
    summary: "面向 Deepfake 检测的时空多分支模块，用于判断人脸视频是否由 AI 生成。",
    venue: "CVIP 2025",
  },
];
