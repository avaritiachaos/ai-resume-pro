"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "免费体验",
    price: "¥0",
    description: "首次登录即可免费体验 1 次 AI 优化",
    icon: Zap,
    features: [
      "1 次免费 AI 优化",
      "STAR 法则改写",
      "基础量化数据添加",
      "PDF 导出功能",
    ],
    cta: "免费开始",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "专业版",
    price: "¥49",
    period: "一次性",
    description: "适合正在求职的专业人士",
    icon: Sparkles,
    features: [
      "50 次 AI 优化额度",
      "STAR 法则深度改写",
      "高级量化数据生成",
      "多轮对话式优化",
      "精美 PDF 导出",
      "优先客服支持",
    ],
    cta: "立即购买",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "旗舰版",
    price: "¥99",
    period: "一次性",
    description: "适合需要全面优化的高管",
    icon: Crown,
    features: [
      "无限次 AI 优化",
      "STAR + CAR 双法则改写",
      "行业定制化优化建议",
      "LinkedIn 摘要生成",
      "求职信自动生成",
      "1v1 专家审核（1次）",
      "终身更新",
    ],
    cta: "立即购买",
    variant: "outline" as const,
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            简单透明的
            <span className="text-blue-500">定价方案</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            一次投资，让你的简历在 HR 眼前一亮
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`relative h-full p-6 sm:p-8 ${
                  plan.popular
                    ? "border-blue-500/50 bg-gray-900/80 shadow-blue-500/10 shadow-xl"
                    : "border-white/10 bg-gray-900/50"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white">
                    最受欢迎
                  </Badge>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      plan.popular ? "bg-blue-600" : "bg-gray-800"
                    }`}>
                      <plan.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-500 text-sm">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/dashboard" className="block">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-800 hover:bg-gray-700 text-white"
                    }`}
                    variant={plan.variant}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
