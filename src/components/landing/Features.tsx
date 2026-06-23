"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Brain,
  FileText,
  Download,
  Shield,
  Zap,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "硅谷 HR 级 AI",
    description: "基于世界 500 强 HR 专家知识训练，精准把握招聘偏好",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Target,
    title: "STAR 法则重构",
    description: "自动将经历改写为 Situation-Task-Action-Result 结构",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "量化数据生成",
    description: "智能添加百分比、金额、规模等量化指标，让成果可衡量",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: FileText,
    title: "PDF/Word 解析",
    description: "支持拖拽上传 PDF 和 Word 文档，自动提取文本内容",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Download,
    title: "精美 PDF 导出",
    description: "一键导出排版精美的 PDF 简历，可直接投递使用",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "数据安全",
    description: "端到端加密传输，简历数据不存储，隐私有保障",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            为什么选择
            <span className="text-blue-500"> AI Resume Pro</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            从简历解析到优化导出，一站式解决你的简历痛点
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full bg-gray-900/50 border-white/10 p-6 hover:border-white/20 transition-colors">
                <div className={`h-12 w-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
