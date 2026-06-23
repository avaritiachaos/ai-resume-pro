"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-950 to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400 mb-8">
            <Zap className="h-4 w-4" />
            AI 驱动 · 硅谷级简历优化
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            让你的简历
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              脱颖而出
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-400 mb-10">
            由世界 500 强 HR 专家知识训练的 AI 引擎，将你的每段经历重塑为
            <br className="hidden sm:block" />
            符合 STAR 法则、量化数据驱动、极具杀伤力的专业描述
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl">
                立即免费体验
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                了解工作原理
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>数据安全加密</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>30 秒出结果</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>免费体验 1 次</span>
            </div>
          </div>
        </motion.div>

        {/* Floating preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 relative"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm p-1 shadow-2xl">
            <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-medium text-red-400 mb-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    优化前
                  </div>
                  <div className="text-sm text-gray-400 leading-relaxed space-y-2">
                    <p>负责公司网站开发工作</p>
                    <p>参与了多个项目</p>
                    <p>帮助团队完成了一些任务</p>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-green-400 mb-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    优化后
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed space-y-2">
                    <p>主导公司核心电商平台重构，采用 Next.js + TypeScript 技术栈，页面加载速度提升 40%，用户转化率提高 25%</p>
                    <p>独立交付 5 个企业级项目，累计服务 10 万+ 用户，系统可用性保持 99.9%</p>
                    <p>推动团队 CI/CD 流程优化，部署效率提升 60%，减少线上故障 80%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
