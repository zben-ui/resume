export type SkillGroup = {
  id: string;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "llm-app",
    title: "AI应用开发",
    items: ["熟悉 LangChain、LangGraph 等大模型应用框架，掌握多轮对话、Structured Output、Tool/Function Calling、流式响应等开发方式；理解 Agent 状态流转、工具调度与上下文管理机制。"],
  },
  {
    id: "rag-agent",
    title: "RAG与知识库开发",
    items: ["掌握文档解析、Chunk 切分、Embedding、向量检索、Rerank、上下文构建与生成回答等完整RAGPipeline；理解ChunkSize、Top-K、召回率，能够针对具体场景优化检索链路"],
  },
  {
    id: "deploy",
    title: "大模型部署",
    items: ["具备 Qwen3-14B 等大模型领域微调实践，熟悉 Ollama 本地模型部署及通义千问等云端模型 API 接入方式；掌握 Prompt Engineering、Few-shot、结构化输出和上下文约束等模型效果优化方法。"],
  },
  {
    id: "cv",
    title: "Computer Vision",
    items: ["OpenCV", "PyTorch", "图像分类", "目标检测", "图像分割"],
  },
  {
    id: "yolo-sam",
    title: "计算机视觉开发",
    items: ["熟悉 PyTorch、OpenCV，掌握图像分类、目标检测、图像分割及视频理解基本流程；具备 YOLO 实际训练与竞赛应用经验，能够完成数据标注、训练、验证、推理及 Precision、Recall、mAP等指标分析。"],
  },
  {
    id: "multimodal",
    title: "AI Agent开发",
    items: ["了解 ReAct、Tool Calling、Memory、Workflow 等 Agent 核心机制，具备任务拆解、工具调用、多步骤执行与状态管理实践，能够根据确定性流程与动态任务分别选择 Workflow、单 Agent 或多 Agent 架构。"],
  },
  {
    id: "tools",
    title: "AI工程化能力",
    items: ["熟悉 Python、FastAPI、Git、Docker 等开发与部署工具，了解 API 异常处理、超时重试、日志记录、模型服务封装等 AI 应用工程问题，能够完成从模型能力验证到 Web/API 服务集成的开发流程。"],
  },
  {
    id: "coding",
    title: "AI辅助软件开发",
    items: ["熟练使用 ChatGPT、Codex、Claude Code、Cursor 等 AI 编程工具完成需求分析、技术选型、代码生成、调试、测试与重构；具备将实际开发经验整理为可复用 Skill、Prompt 和 AI Workflow 的能力。"],
  },
];
