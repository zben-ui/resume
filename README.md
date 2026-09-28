# 赵奔 · 数字个人展厅

电脑端滚动叙事简历。人物序列帧由滚轮控制：向下播放，停下即停，向上倒放。

## 目录

```
public/frames/              序列帧 frame_0001.webp ...
public/frames-manifest.json 帧清单，由脚本生成
scripts/generate-manifest.mjs
src/config/portfolio.ts     滚动长度、阶段区间、晶体节点位置
src/data/                   简历、竞赛、论文、技能、项目
src/components/             画面、阶段文案、面板
src/hooks/useFrameSequence.ts
src/app/                    Next.js 页面
```

## 安装和运行

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:3000

生产构建：

```bash
npm run build
npm start
```

## 序列帧放在哪里

把 WebP 放进 `public/frames/`，命名保持：

```
frame_0001.webp
frame_0002.webp
...
```

然后执行：

```bash
npm run frames
```

`npm run dev` 和 `npm run build` 也会自动生成 `public/frames-manifest.json`。总帧数不要写死在组件里，页面启动时读取这份清单。

## 调整总帧数

换一批帧之后只要重新运行 `npm run frames`。清单里的 `count` 就是总帧数。进度 0 对应第 1 帧，进度 1 对应最后一帧。

## 调整滚动长度

打开 `src/config/portfolio.ts`，修改 `experience.scrollVh`。数值越大，同样的滚轮走得越慢。现在是 `720`。

`experience.scrub` 控制滚轮和画面的跟随。`true` 最跟手；`0.15` 只有很短的缓冲。

## 调整阶段出现时间

帧段落在 `src/config/portfolio.ts` 的 `reels`。`from` / `to` 是帧号，`span` 是这段占的滚动长度，`snap` 是吸附落点。

```ts
{ id: "motive", from: 15, to: 20, span: 0.052, snap: 0.64 }
{ id: "projects", from: 84, to: 95, span: 0.076, snap: 0.5 }
{ id: "finale", from: 180, to: 180, span: 0.07, snap: 0.68 }
```

晶体周围四个标签的位置在 `crystalNodes`，`x` / `y` 是百分比，`appearFrame` 是开始出现的帧，`focusFrame` 是点击后吸附到的详情帧。

阶段内部的文字先后在 `beats` 里，用的是该阶段自己的 0 到 1。

## 修改简历文字

- 姓名、介绍、邮箱、GitHub：`src/data/resume.ts`
- 竞赛：`src/data/achievements.ts`
- 论文：`src/data/papers.ts`
- 技能分类：`src/data/skills.ts`
- 项目：`src/data/projects.ts`

## 添加项目

在 `src/data/projects.ts` 的 `projects` 数组里追加一项，字段和现有项目相同：`index`、`title`、`subtitle`、`summary`、`stack`、`flow`、`outcome`、`github`。序列尾部和弹层会自动出现它。

## 移动晶体节点

`src/config/portfolio.ts` 的 `crystalNodes`。`x` 和 `y` 是相对画面宽高的百分比。`appearFrame` 是节点开始淡入的帧号。

## 部署到 Vercel

1. 把整个项目推到 GitHub。确认 `public/frames` 里的 WebP 已提交。
2. 在 Vercel 导入仓库。
3. Framework 选 Next.js，安装命令 `npm install`，构建命令 `npm run build`。
4. 不要额外配置环境变量。
5. 部署完成后打开线上地址，滚轮应能驱动人物序列。

如果帧文件很多，注意 Git 仓库体积。180 张 1080p WebP 大约 12MB，可以直接提交。
