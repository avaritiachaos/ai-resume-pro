"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import { useStore } from "@/lib/store";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ResumeEditor() {
  const { resumeText, setResumeText, credits, useCredit, setCredits, setPaywallOpen } =
    useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleOptimize = useCallback(
    async (textToOptimize: string) => {
      if (!textToOptimize.trim()) return;

      // FIX: Check credit availability but don't deduct yet
      if (credits <= 0) {
        setPaywallOpen(true);
        return;
      }

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: textToOptimize,
      };

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/optimize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: textToOptimize }),
        });

        if (!response.ok) throw new Error("Optimization failed");

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          let accumulated = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            accumulated += chunk;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsg.id
                  ? { ...m, content: accumulated }
                  : m
              )
            );
          }

          // FIX: Only deduct credit AFTER successful API response
          useCredit();
        }
      } catch (error) {
        console.error("Optimization failed:", error);
        // FIX: Don't deduct credit on failure - no refund needed since we didn't deduct
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: "优化失败，请重试。（本次未消耗额度）" }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [credits, useCredit, setPaywallOpen]
  );

  const handleOptimizeAll = useCallback(() => {
    if (!resumeText.trim()) return;
    handleOptimize(resumeText);
  }, [resumeText, handleOptimize]);

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const assistantMessages = messages.filter((m) => m.role === "assistant");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Left panel - Original content */}
      <Card className="bg-gray-900/50 border-white/10 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">原始简历</h3>
            <p className="text-sm text-gray-400">在此编辑或粘贴你的简历内容</p>
          </div>
          <Badge variant="outline" className="border-white/20 text-gray-400">
            {resumeText.length} 字符
          </Badge>
        </div>

        <Textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder={`请在此处粘贴你的简历内容，或上传文件自动填充...

示例：
负责公司前端项目开发
参与了多个业务模块的实现
协助团队完成项目上线`}
          className="flex-1 min-h-[400px] bg-gray-800/50 border-white/10 text-white placeholder:text-gray-600 resize-none font-mono text-sm leading-relaxed"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-400">
              剩余优化次数：
              <span className="text-white font-medium">{credits}</span>
            </span>
          </div>
          <Button
            onClick={handleOptimizeAll}
            disabled={!resumeText.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                AI 优化中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                一键 AI 优化
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Right panel - Optimized content */}
      <Card className="bg-gray-900/50 border-white/10 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">AI 优化结果</h3>
            <p className="text-sm text-gray-400">基于 STAR 法则的专业改写</p>
          </div>
          <Badge variant="outline" className="border-green-500/30 text-green-400">
            {assistantMessages.length} 条优化
          </Badge>
        </div>

        <div className="flex-1 overflow-auto space-y-4">
          {assistantMessages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm">
                  点击 &ldquo;一键 AI 优化&rdquo; 按钮
                  <br />
                  获取专业的简历改写建议
                </p>
              </div>
            </div>
          ) : (
            assistantMessages.map((message) => (
              <Card
                key={message.id}
                className="bg-gray-800/50 border-green-500/20 p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                    AI 优化建议
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(message.content, message.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedId === message.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {message.content || (
                    <span className="text-gray-500 animate-pulse">
                      AI 正在思考中...
                    </span>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
