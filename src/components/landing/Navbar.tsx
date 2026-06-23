"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">
              AI Resume<span className="text-blue-500">Pro</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
              功能特性
            </a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
              定价方案
            </a>
            <a href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">
              工作流程
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                登录
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                免费开始
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-3">
            <a href="#features" className="block text-sm text-gray-300 hover:text-white py-2">
              功能特性
            </a>
            <a href="#pricing" className="block text-sm text-gray-300 hover:text-white py-2">
              定价方案
            </a>
            <a href="#how-it-works" className="block text-sm text-gray-300 hover:text-white py-2">
              工作流程
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full text-gray-300">登录</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">免费开始</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
