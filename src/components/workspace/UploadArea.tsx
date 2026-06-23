"use client";

import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";
import { useStore } from "@/lib/store";

export function UploadArea() {
  const { setResumeText, setUploadOpen } = useStore();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setFileName(file.name);

      if (file.type === "application/pdf") {
        // For PDF parsing, we use a simple text extraction
        // In production, use pdf-parse or similar library
        const text = await file.text();
        setResumeText(text || `[PDF 文件已上传: ${file.name}]\n\n请在此处粘贴或编辑您的简历内容。`);
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword"
      ) {
        const text = await file.text();
        setResumeText(text || `[Word 文件已上传: ${file.name}]\n\n请在此处粘贴或编辑您的简历内容。`);
      } else {
        const text = await file.text();
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
        {fileName ? (
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
                支持 PDF、Word (.docx)、纯文本 (.txt) 格式
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
