import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Resume Pro - AI 驱动的专业简历优化平台",
  description:
    "由世界 500 强 HR 专家知识训练的 AI 引擎，将你的每段经历重塑为符合 STAR 法则、量化数据驱动、极具杀伤力的专业描述。",
  keywords: ["简历优化", "AI", "STAR法则", "求职", "简历改写"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
