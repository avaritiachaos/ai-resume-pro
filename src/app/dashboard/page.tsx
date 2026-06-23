"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowLeft,
  Upload,
  Download,
  CreditCard,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { UploadArea } from "@/components/workspace/UploadArea";
import { ResumeEditor } from "@/components/workspace/ResumeEditor";
import { ExportButton } from "@/components/workspace/ExportButton";
import { PaywallDialog } from "@/components/workspace/PaywallDialog";
import { AuthButton } from "@/components/workspace/AuthButton";

export default function DashboardPage() {
  const {
    resumeText,
    credits,
    isUploadOpen,
    setUploadOpen,
    setPaywallOpen,
  } = useStore();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm hidden sm:inline">返回首页</span>
              </Link>
              <div className="h-6 w-px bg-white/10" />
              <Link href="/" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-bold text-white">
                  AI Resume<span className="text-blue-500">Pro</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-blue-500/30 text-blue-400 hidden sm:flex"
              >
                <CreditCard className="mr-1 h-3 w-3" />
                {credits} 次额度
              </Badge>

              {credits <= 0 && (
                <Button
                  size="sm"
                  onClick={() => setPaywallOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  充值
                </Button>
              )}

              <ExportButton />
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">简历优化工作区</h1>
              <p className="text-gray-400 text-sm mt-1">
                上传或粘贴你的简历，AI 将为你提供专业的优化建议
              </p>
            </div>
            <Button
              onClick={() => setUploadOpen(!isUploadOpen)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Upload className="mr-2 h-4 w-4" />
              上传简历
            </Button>
          </div>

          {isUploadOpen && (
            <div className="mb-6">
              <UploadArea />
            </div>
          )}
        </div>

        {/* Editor Section */}
        <ResumeEditor />

        {/* FIX: Export area uses position:absolute instead of display:none so html2canvas can render it */}
        <div
          id="resume-export-area"
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            width: "210mm",
            background: "#fff",
          }}
        >
          <div style={{ padding: "40px", fontFamily: "serif", color: "#000" }}>
            <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
              AI 优化简历
            </h1>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
              {resumeText}
            </div>
          </div>
        </div>
      </main>

      {/* Paywall Dialog */}
      <PaywallDialog />
    </div>
  );
}
