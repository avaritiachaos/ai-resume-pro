"use client";

import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { useStore } from "@/lib/store";

// FIX: File size limit (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// FIX: Allowed MIME types (drag-and-drop bypasses accept attribute)
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
]);

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".txt"];

function isAllowedFile(file: File): boolean {
  if (ALLOWED_TYPES.has(file.type)) return true;
  const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
  return ALLOWED_EXTENSIONS.includes(ext);
}

export function UploadArea() {
  const { setResumeText, setUploadOpen } = useStore();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      // FIX: Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError(`文件过大。最大支持 ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        return;
      }

      // FIX: Validate file type (not just rely on accept attribute)
      if (!isAllowedFile(file)) {
        setError("不支持的文件格式。请上传 PDF、Word 或纯文本文件。");
        return;
      }

      setFileName(file.name);

      if (
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        // FIX: PDF files are binary - don't use file.text() which produces garbled output.
        // Show a placeholder message asking user to paste content manually.
        setResumeText(
          `[PDF 文件已上传: ${file.name}]\n\n` +
          `PDF 文件无法直接解析文本。请手动复制简历内容并粘贴到左侧编辑器中。\n\n` +
          `提示：大多数 PDF 阅读器支持 Ctrl+A 全选 → Ctrl+C 复制。`
        );
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword" ||
        file.name.toLowerCase().endsWith(".docx") ||
        file.name.toLowerCase().endsWith(".doc")
      ) {
        // FIX: Word files are also binary - same treatment
        setResumeText(
          `[Word 文件已上传: ${file.name}]\n\n` +
          `Word 文件无法直接解析文本。请手动复制简历内容并粘贴到左侧编辑器中。\n\n` +
          `提示：在 Word 中 Ctrl+A 全选 → Ctrl+C 复制。`
        );
      } else {
        // Plain text files can be read directly
        const text = await file.text();
        if (!text.trim()) {
          setError("文件内容为空");
          return;
        }
        setResumeText(text);
      }

      setUploadOpen(false);
    },
    [setResumeText, setUploadOpen]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <Card
      className={`relative border-2 border-dashed p-12 text-center transition-colors cursor-pointer ${
        isDragging
          ? "border-blue-500 bg-blue-500/10"
          : error
            ? "border-red-500/50 bg-red-500/5"
            : "border-white/20 bg-gray-900/50 hover:border-white/40"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={handleInputChange}
      />

      <div className="flex flex-col items-center gap-4">
        {error ? (
          <>
            <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <p className="text-red-400 font-medium">{error}</p>
              <p className="text-sm text-gray-500 mt-1">点击重新选择文件</p>
            </div>
          </>
        ) : fileName ? (
          <>
            <div className="h-16 w-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <FileText className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <p className="text-white font-medium">{fileName}</p>
              <p className="text-sm text-gray-400">文件已上传成功</p>
            </div>
          </>
        ) : (
          <>
            <div
              className={`h-16 w-16 rounded-2xl flex items-center justify-center ${
                isDragging ? "bg-blue-500/20" : "bg-gray-800"
              }`}
            >
              <Upload
                className={`h-8 w-8 ${
                  isDragging ? "text-blue-400" : "text-gray-400"
                }`}
              />
            </div>
            <div>
              <p className="text-white font-medium">
                拖拽简历文件到此处，或点击上传
              </p>
              <p className="text-sm text-gray-400 mt-1">
                支持 PDF、Word (.docx)、纯文本 (.txt) 格式 · 最大 10MB
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
