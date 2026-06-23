"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(async () => {
    setIsExporting(true);

    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("resume-export-area");
      if (!element) {
        alert("请先添加简历内容");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        0,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("AI优化简历.pdf");
    } catch (error) {
      console.error("Export failed:", error);
      alert("导出失败，请重试");
    } finally {
      setIsExporting(false);
    }
  }, []);

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      className="border-white/20 text-white hover:bg-white/10"
    >
      {isExporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          导出中...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          导出 PDF
        </>
      )}
    </Button>
  );
}
