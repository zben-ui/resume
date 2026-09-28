import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "赵奔 · 视觉创意 × AI技术",
  description: "赵奔的数字个人展厅。软件工程、人工智能应用、计算机视觉与 AIGC。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
