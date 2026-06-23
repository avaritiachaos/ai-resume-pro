"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Crown, Check, CreditCard } from "lucide-react";
import { useStore } from "@/lib/store";

const plans = [
  {
    id: "pro",
    name: "专业版",
    price: "¥49",
    credits: 50,
    icon: Sparkles,
    popular: true,
    features: ["50 次 AI 优化", "STAR 法则深度改写", "PDF 导出"],
  },
  {
    id: "premium",
    name: "旗舰版",
    price: "¥99",
    credits: 999,
    icon: Crown,
    popular: false,
    features: ["无限次 AI 优化", "行业定制建议", "1v1 专家审核"],
  },
];

export function PaywallDialog() {
  const { isPaywallOpen, setPaywallOpen, setCredits } = useStore();

  const handlePurchase = async (planId: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (data.url) {
        // In production, redirect to Stripe checkout
        // window.location.href = data.url;

        // Mock: add credits directly
        const plan = plans.find((p) => p.id === planId);
        if (plan) {
          setCredits(plan.credits);
        }
        setPaywallOpen(false);
      }
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  return (
    <Dialog open={isPaywallOpen} onOpenChange={setPaywallOpen}>
      <DialogContent className="bg-gray-900 border-white/10 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            免费次数已用完
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            升级获得更多 AI 优化次数，让你的简历更上一层楼
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-4 ${
                plan.popular
                  ? "border-blue-500/50 bg-gray-800/80"
                  : "border-white/10 bg-gray-800/50"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-xs">
                  推荐
                </Badge>
              )}

              <div className="text-center mb-4">
                <plan.icon
                  className={`h-8 w-8 mx-auto mb-2 ${
                    plan.popular ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <h3 className="font-semibold text-white">{plan.name}</h3>
                <div className="text-2xl font-bold text-white mt-1">
                  {plan.price}
                </div>
                <p className="text-xs text-gray-400">
                  {plan.credits === 999 ? "无限次" : `${plan.credits} 次额度`}
                </p>
              </div>

              <ul className="space-y-2 mb-4">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-gray-300"
                  >
                    <Check className="h-3 w-3 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePurchase(plan.id)}
                className={`w-full text-sm ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                size="sm"
              >
                <CreditCard className="mr-2 h-3 w-3" />
                立即购买
              </Button>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
