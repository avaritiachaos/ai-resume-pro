"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <span className="text-lg font-bold text-white">
                AI Resume<span className="text-blue-500">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              AI 驱动的专业简历优化平台，让你的简历在众多候选人中脱颖而出。
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">产品</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#features" className="hover:text-gray-300 transition-colors">功能特性</a></li>
              <li><a href="#pricing" className="hover:text-gray-300 transition-colors">定价方案</a></li>
              <li><Link href="/dashboard" className="hover:text-gray-300 transition-colors">开始使用</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">支持</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-300 transition-colors">帮助中心</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">联系我们</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">反馈建议</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">法律</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-300 transition-colors">隐私政策</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">服务条款</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">退款政策</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} AI Resume Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
