"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

const comparisons = [
  {
    before: "负责后端 API 开发",
    after:
      "主导设计并实现微服务架构的后端 API 系统，日均处理 50 万+ 请求，P99 延迟从 800ms 优化至 120ms，系统吞吐量提升 5 倍",
  },
  {
    before: "做了公司的管理后台",
    after:
      "从零构建企业级运营管理后台（React + Node.js），覆盖 15 个业务模块，赋能 200+ 运营人员，人工操作效率提升 70%",
  },
  {
    before: "协助团队完成项目上线",
    after:
      "协调 5 人跨职能团队完成关键产品迭代，提前 2 周交付上线，首月新增付费用户 3000+，ARR 增长 $120K",
  },
];

export function BeforeAfter() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            看看 AI 是如何
            <span className="text-blue-500">点石成金</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            每一段平淡的描述，都能被改写为令人印象深刻的成就
          </p>
        </motion.div>

        <div className="space-y-8">
          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="bg-gray-900/50 border-white/10 p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                      <XCircle className="h-4 w-4" />
                      优化前
                    </div>
                    <p className="text-gray-400 text-base leading-relaxed pl-6">
                      {item.before}
                    </p>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      优化后
                    </div>
                    <p className="text-gray-200 text-base leading-relaxed pl-6">
                      {item.after}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
