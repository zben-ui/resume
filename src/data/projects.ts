export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  stack: string[];
  flow: string[];
  outcome: string;
  github: string;
};

export const projectsIntro = {
  title: "项目实践",
  subtitle: "从想法，到真正可以运行的产品。",
};

export const projects: Project[] = [
  {
    id: "xingqing-risk",
    index: "01",
    title: "心晴智语",
    subtitle: "AI 赋能高校心理关怀与风险预警平台",
    summary: "核心模块是心理—学业报告生成 Agent。先聚类，再检索，最后写出可以干预的个性化报告。",
    stack: ["K-Means", "RAG", "Agent", "心理普测"],
    flow: ["K-Means", "学生心理普测聚类", "RAG 检索各组心理特征", "识别心理状态与学业表现关系", "生成个性化报告", "用于前置性学业辅助干预"],
    outcome: "把心理普测和学业表现连起来，生成可执行的前置干预报告。",
    github: "https://github.com/zben-ui/Xingqing",
  },
  {
    id: "xingqing-dialog",
    index: "02",
    title: "心晴智语",
    subtitle: "智能 AI 心理服务系统的设计与研究",
    summary: "用领域微调和专业语料，让心理对话同时具备专业度和共情，并用语音把机械感拿掉。",
    stack: ["Qwen3-14B", "RAG", "讯飞星火 TTS"],
    flow: ["Qwen3-14B 领域微调", "RAG 检索心理医生专业语料", "AI 心理对话", "接入讯飞星火 TTS", "语音交互"],
    outcome: "提高心理领域回答的专业度，同时保持自然、有共情的交互。",
    github: "https://github.com/zben-ui/Xingqing",
  },
  {
    id: "consent-ocr",
    index: "03",
    title: "知情同意书识别",
    subtitle: "基于 YOLO 的缺项检测",
    summary: "面向牙科手术知情同意书，定位表单区域并判断某一项是否空缺。",
    stack: ["YOLO", "OCR", "数据集标注"],
    flow: ["数据集标注", "YOLO 训练", "定位表单区域", "识别某一项是否空缺"],
    outcome: "把同意书缺项检查从人工翻页，收成一次检测。",
    github: "https://github.com/zben-ui/-OCR-",
  },
  {
    id: "dev-skill",
    index: "04",
    title: "软件工程 Skill",
    subtitle: "从想法到上线的软件开发工作流",
    summary: "把需求、选型、分阶段开发、测试和部署整理成可复用的 AI Skill。",
    stack: ["AI沟通", "工作流设计", "Prompt Engineering", "Skill编写"],
    flow: ["需求梳理", "技术选型", "分阶段开发", "测试", "部署"],
    outcome: "把「从想法到上线」写成可以反复调用的开发工作流。",
    github: "https://github.com/zben-ui/-Skill",
  },
];
