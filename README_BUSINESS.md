# AI Resume Pro - 商业级 AI 简历优化 SaaS 平台

> 🚀 由世界 500 强 HR 专家知识训练的 AI 引擎，将你的每段经历重塑为符合 STAR 法则、量化数据驱动、极具杀伤力的专业描述。

---

## 📋 目录

- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [环境变量配置](#环境变量配置)
- [功能模块说明](#功能模块说明)
- [部署指南](#部署指南)
- [Stripe 支付集成](#stripe-支付集成)
- [OpenAI API 配置](#openai-api-配置)
- [数据库配置（可选）](#数据库配置可选)
- [自定义指南](#自定义指南)
- [常见问题](#常见问题)
- [许可证](#许可证)

---

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 16.x |
| 语言 | TypeScript | 5.x |
| 样式 | Tailwind CSS | 4.x |
| UI 组件 | Shadcn UI | Latest |
| 图标 | Lucide React | Latest |
| 状态管理 | Zustand | Latest |
| AI 集成 | Vercel AI SDK + OpenAI | 6.x |
| 动画 | Framer Motion | Latest |
| PDF 导出 | html2canvas + jsPDF | Latest |
| 认证 | NextAuth.js | Beta |
| 支付 | Stripe Checkout | Latest |

---

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts   # NextAuth 认证 API
│   │   ├── checkout/route.ts             # Stripe 支付 API
│   │   ├── optimize/route.ts             # AI 优化 API (核心)
│   │   └── webhook/route.ts              # Stripe Webhook
│   ├── dashboard/
│   │   └── page.tsx                      # 工作区主页面
│   ├── globals.css                       # 全局样式
│   ├── layout.tsx                        # 根布局
│   └── page.tsx                          # 着陆页
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx                    # 导航栏
│   │   ├── Hero.tsx                      # Hero 区域
│   │   ├── Features.tsx                  # 功能特性
│   │   ├── BeforeAfter.tsx               # 优化前后对比
│   │   ├── Pricing.tsx                   # 定价方案
│   │   └── Footer.tsx                    # 页脚
│   ├── ui/                               # Shadcn UI 组件
│   └── workspace/
│       ├── AuthButton.tsx                # 登录按钮
│       ├── ExportButton.tsx              # PDF 导出
│       ├── PaywallDialog.tsx             # 支付墙弹窗
│       ├── ResumeEditor.tsx              # 简历编辑器（核心）
│       └── UploadArea.tsx                # 文件上传区域
├── lib/
│   ├── auth.ts                           # NextAuth 配置
│   ├── store.ts                          # Zustand 状态管理
│   └── utils.ts                          # 工具函数
└── hooks/                                # 自定义 Hooks
```

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看着陆页，http://localhost:3000/dashboard 进入工作区。

### 4. 构建生产版本

```bash
npm run build
npm start
```

---

## 环境变量配置

创建 `.env.local` 文件，配置以下环境变量：

```env
# ===========================================
# OpenAI API (必需 - 用于 AI 简历优化)
# ===========================================
OPENAI_API_KEY=sk-your-openai-api-key-here

# ===========================================
# NextAuth.js 认证 (可选 - 当前使用 Mock 登录)
# ===========================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here

# GitHub OAuth (可选)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Google OAuth (可选)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# ===========================================
# Stripe 支付 (可选 - 当前使用 Mock 支付)
# ===========================================
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
STRIPE_PRO_PRICE_ID=price_your-pro-plan-id
STRIPE_PREMIUM_PRICE_ID=price_your-premium-plan-id

# ===========================================
# 应用配置
# ===========================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 功能模块说明

### 1. Landing Page（着陆页）

**路径**: `/`

包含以下模块：
- **Navbar**: 响应式导航栏，支持移动端汉堡菜单
- **Hero Section**: 带动效的 Hero 区域，展示"优化前 vs 优化后"对比
- **Features**: 6 大核心功能展示卡片
- **BeforeAfter**: 3 组真实优化前后对比案例
- **Pricing**: 3 个定价方案（免费/专业版/旗舰版）
- **Footer**: 页脚链接

**设计风格**: 黑白灰 + 亮蓝色调，体现专业精英感

### 2. 用户认证

**当前状态**: Mock 登录（点击登录按钮直接进入）

**生产环境配置**:

1. 前往 [GitHub Developer Settings](https://github.com/settings/developers) 创建 OAuth App
2. 或前往 [Google Cloud Console](https://console.cloud.google.com/) 创建 OAuth 2.0 凭据
3. 将 Client ID 和 Secret 填入 `.env.local`
4. 修改 `src/components/workspace/AuthButton.tsx` 中的登录逻辑：

```typescript
import { signIn } from "next-auth/react";

const handleLogin = () => {
  signIn('github'); // 或 signIn('google')
};
```

### 3. 简历解析与交互工作区

**路径**: `/dashboard`

核心功能：
- **文件上传**: 支持拖拽上传 PDF/Word/TXT 文件
- **左右分栏编辑器**: 左边原始内容，右边 AI 优化建议
- **流式 AI 响应**: 使用 Server-Sent Events 实时显示优化结果
- **STAR 法则改写**: AI 自动将经历重构为 Situation-Task-Action-Result 结构

**核心 System Prompt**:
```
你是一位有着 10 年经验的世界 500 强硅谷大厂 HR，
请将用户的简历经历改写为符合 STAR 法则、包含量化数据、
极具杀伤力的专业描述。
```

### 4. PDF 导出

使用 `html2canvas` + `jsPDF` 实现客户端 PDF 导出：
- 自动排版为 A4 尺寸
- 高清 2x 渲染
- 一键下载

### 5. 支付墙 (Paywall)

**逻辑流程**:
1. 用户首次登录获得 1 个 Free Credit
2. 每次 AI 优化消耗 1 个 Credit
3. Credit 用完后弹出充值弹窗
4. 选择套餐后跳转 Stripe Checkout
5. 支付成功后 Webhook 回调增加 Credit

---

## 部署指南

### Vercel 部署（推荐）

1. Push 代码到 GitHub
2. 前往 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 点击 Deploy

### Docker 部署

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

### 传统服务器部署

```bash
# 构建
npm run build

# 使用 PM2 启动
npm install -g pm2
pm2 start npm --name "ai-resume" -- start
pm2 save
pm2 startup
```

---

## Stripe 支付集成

### 1. 创建 Stripe 账户

前往 [Stripe Dashboard](https://dashboard.stripe.com/) 注册账户。

### 2. 获取 API 密钥

在 Stripe Dashboard → Developers → API keys 中获取：
- `STRIPE_SECRET_KEY`: 以 `sk_test_` 开头的测试密钥
- 发布时替换为 `sk_live_` 开头的生产密钥

### 3. 创建产品和价格

```bash
# 使用 Stripe CLI 创建产品
stripe products create \
  --name="AI Resume Pro 专业版" \
  --description="50 次 AI 优化额度"

stripe prices create \
  --product=prod_xxx \
  --unit-amount=4900 \
  --currency=cny
```

### 4. 配置 Webhook

1. 在 Stripe Dashboard → Developers → Webhooks 添加端点
2. 端点 URL: `https://your-domain.com/api/webhook`
3. 监听事件: `checkout.session.completed`
4. 将 Webhook Secret 填入环境变量

### 5. 生产环境代码

取消 `src/app/api/checkout/route.ts` 中的注释，启用真实的 Stripe 调用。

---

## OpenAI API 配置

### 1. 获取 API Key

前往 [OpenAI Platform](https://platform.openai.com/) 创建 API Key。

### 2. 配额和计费

- 建议使用 GPT-4o 模型（性价比最高）
- 每次优化约消耗 500-1000 tokens
- 建议设置用量限制避免超额

### 3. 更换模型

修改 `src/app/api/optimize/route.ts`：

```typescript
// 使用 GPT-4o (推荐)
const result = streamText({
  model: openai("gpt-4o"),
  // ...
});

// 使用 GPT-4o-mini (更便宜)
const result = streamText({
  model: openai("gpt-4o-mini"),
  // ...
});

// 使用 Claude (需要安装 @ai-sdk/anthropic)
const result = streamText({
  model: anthropic("claude-3-5-sonnet-20241022"),
  // ...
});
```

---

## 数据库配置（可选）

当前版本使用内存状态管理（Zustand），用户数据不会持久化。

如需持久化用户数据和 Credit 管理，推荐使用：

### Prisma + PostgreSQL

```bash
npm install prisma @prisma/client
npx prisma init
```

**Schema 示例** (`prisma/schema.prisma`):

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  credits   Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Payment {
  id        String   @id @default(cuid())
  userId    String
  amount    Int
  plan      String
  stripeId  String?  @unique
  createdAt DateTime @default(now())
}
```

---

## 自定义指南

### 修改配色方案

编辑 `src/app/globals.css` 中的 CSS 变量：

```css
:root {
  --primary: oklch(0.205 0 0);     /* 主色调 */
  --accent: oklch(0.97 0 0);       /* 强调色 */
  /* ... */
}
```

### 修改 AI Prompt

编辑 `src/app/api/optimize/route.ts` 中的 `SYSTEM_PROMPT`：

```typescript
const SYSTEM_PROMPT = `你的自定义 Prompt...`;
```

### 添加新的 Shadcn 组件

```bash
npx shadcn@latest add [component-name]
```

### 修改定价方案

编辑 `src/components/landing/Pricing.tsx` 中的 `plans` 数组。

---

## 常见问题

### Q: 构建时出现类型错误怎么办？

```bash
# 清除缓存重新构建
rm -rf .next node_modules
npm install
npm run build
```

### Q: AI 优化没有响应？

1. 检查 `OPENAI_API_KEY` 是否正确配置
2. 确认 OpenAI 账户有足够额度
3. 查看终端日志中的错误信息

### Q: 如何切换到中文界面？

项目默认使用中文，如需修改文本，搜索对应组件文件中的中文字符串即可。

### Q: 如何添加更多语言支持？

使用 Next.js 的 i18n 功能，在 `src/app/[locale]/` 下创建多语言路由。

### Q: PDF 导出失败？

1. 确保浏览器允许下载
2. 检查简历内容是否为空
3. 尝试减少简历内容长度

---

## 许可证

MIT License

---

## 技术支持

如有问题，请提交 Issue 或联系开发团队。

---

**Built with ❤️ using Next.js, TypeScript, and AI**
