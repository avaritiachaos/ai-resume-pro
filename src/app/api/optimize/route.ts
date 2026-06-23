import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 60;

const SYSTEM_PROMPT = `你是一位有着 10 年经验的世界 500 强硅谷大厂 HR，请将用户的简历经历改写为符合 STAR 法则、包含量化数据、极具杀伤力的专业描述。

具体要求：
1. 使用 STAR 法则（Situation, Task, Action, Result）重构每段经历
2. 添加量化的数据和指标（百分比、金额、人数等）
3. 使用强有力的动词开头（如：主导、推动、优化、构建）
4. 突出技术影响力和业务价值
5. 保持专业、简洁、有力的语言风格
6. 每段优化后的描述控制在 2-4 句话

请直接输出优化后的内容，不需要额外解释。`;

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response("Missing text field", { status: 400 });
    }

    const result = streamText({
      model: openai("gpt-4o"),
      system: SYSTEM_PROMPT,
      prompt: `请优化以下简历内容：\n\n${text}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Optimization error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
