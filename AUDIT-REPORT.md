# EduGlossary 前端审计报告

**审计日期：** 2026-09-29  
**审计范围：** 前端样式、排版设计、可访问性  
**状态：** 待审查

---

## 📊 执行摘要

本次审计覆盖 `src/styles/global.css`（1142行）及所有页面模板。发现以下核心问题：

| 优先级 | 数量 | 关键问题 |
|--------|------|----------|
| 🔴 高 | 5 | iOS输入框缩放、最小字号违规、重复CSS变量、硬编码断点、缺少token化 |
| 🟡 中 | 8 | 行高不一致、spacing魔法数字、`!important`滥用、深色模式不完整 |
| 🟢 优 | 12 | clamp()响应式、focus可见性、语义化HTML、dark mode支持 |

**预估修复工作量：** 中等（2-3天）

---

## 🗺️ 排版清单

### 全局基础

| 元素 | 选择器 | 移动端 | 桌面端 | line-height | 来源 |
|------|--------|--------|--------|-------------|------|
| Body | `body` | 1rem (16px) | 1rem (16px) | 1.65 | L62 |
| H1 | `h1` | clamp(2rem,4vw,2.75rem) | clamp(2rem,4vw,2.75rem) | 1.2 | L111 |
| H2 | `h2` | clamp(1.5rem,3vw,2rem) | clamp(1.5rem,3vw,2rem) | 1.2 | L112 |
| H3 | `h3` | clamp(1.1rem,2vw,1.25rem) | clamp(1.1rem,2vw,1.25rem) | 1.2 | L113 |
| P | `p` | 1rem | 1rem | 1.65 | L114 |

### Hero区域

| 元素 | 选择器 | 移动端 | 桌面端 | line-height | 来源 |
|------|--------|--------|--------|-------------|------|
| H1 | `.hero h1` | 1.75rem (28px) | clamp(2.25rem,5vw,3.5rem) | 1.1 | L573-583 |
| Subtitle | `.hero-subtitle` | 1.05rem | clamp(1.05rem,2vw,1.25rem) | 1.6 | L586-591 |

### 文章正文

| 元素 | 选择器 | 移动端 | 桌面端 | line-height | 来源 |
|------|--------|--------|--------|-------------|------|
| H1 | `.prose h1` | 1.4rem/1.6rem | clamp(1.75rem,3vw,2.25rem) | 1.25 | L150-154 |
| H2 | `.prose h2` | 1.2rem/1.35rem | clamp(1.5rem,2.5vw,1.75rem) | 1.25 | L156-161 |
| H3 | `.prose h3` | 1.15rem | clamp(1.25rem,2vw,1.4rem) | 1.25 | L162-166 |
| P | `.prose p` | 1rem | 1rem | 1.75 | L174-179 |
| Code | `.prose code` | 0.9em | 0.9em | - | L229-237 |
| Pre | `.prose pre code` | 0.8rem | 0.8rem | 1.6 | L248-255 |

### 卡片组件

| 元素 | 选择器 | 大小 | line-height | 来源 |
|------|--------|------|-------------|------|
| Title | `.card-title` | 1.15rem | 1.35 | L640-646 |
| Excerpt | `.card-excerpt` | 0.9rem | 1.6 | L650-659 |
| Meta | `.card-meta` | 0.8rem | - | L661-671 |

### 导航

| 元素 | 选择器 | 大小 | line-height | 来源 |
|------|--------|------|-------------|------|
| Logo | `.site-header .logo` | 1.35rem | - | L438-446 |
| Nav link | `.site-header ul a` | 0.9rem | - | L457-467 |

---

## 🔴 关键发现

### 1. iOS输入框自动缩放
- **位置：** `src/styles/global.css` L887-894
- **问题：** `.pagefind-ui__search-input` font-size为0.95rem（15.2px），低于iOS 16px阈值，触发自动缩放
- **影响：** 用户体验下降，输入时页面放大
- **建议：**
```css
.pagefind-ui__search-input {
  font-size: 16px !important;
  /* 或添加 */
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
```

### 2. 过小字号违反WCAG
- **位置：** `src/styles/global.css` L625, L934-936
- **问题：** 
  - `.badge` font-size: 0.7rem (11.2px) < 12px
  - `.search-result-type` font-size: 0.65rem (10.4px) < 12px
- **影响：** 可访问性不达标，视障用户难以识别
- **建议：**
```css
.badge { font-size: 0.75rem; } /* 12px */
.search-result-type { font-size: 0.75rem; } /* 12px */
```

### 3. 深色模式变量未完整定义
- **位置：** `src/styles/global.css` L983-1018
- **问题：** 缺少 `--shadow-*`、`--radius-*` 等变量的深色模式覆盖
- **影响：** 深色模式下阴影和圆角效果异常
- **建议：**
```css
[data-theme="dark"] {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4);
}
```

### 4. 重复CSS变量定义
- **位置：** `src/styles/global.css` L9-50 和 L876-884
- **问题：** Pagefind变量在`:root`中定义了两次（L40和L876）
- **影响：** 维护困难，可能产生冲突
- **建议：** 将Pagefind变量合并到主`:root`定义块

### 5. 硬编码断点缺乏token化
- **位置：** `src/styles/global.css` 多处
- **问题：** 768px、480px等断点硬编码，无CSS变量
- **影响：** 修改断点需全局搜索替换
- **建议：**
```css
:root {
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
  --breakpoint-desktop: 1440px;
}
```

---

## 🟡 中等发现

### 6. 行高值不一致
- **问题：** body使用1.65，prose p使用1.75，代码块使用1.6
- **建议：** 统一行高token
```css
:root {
  --lh-tight: 1.2;
  --lh-normal: 1.6;
  --lh-relaxed: 1.75;
}
```

### 7. Spacing魔法数字
- **位置：** L331 `margin-top: 4rem`、L555 `padding: 4rem 0 3.5rem`
- **问题：** 缺少spacing token，数值分散
- **建议：** 建立spacing scale

### 8. `!important`过度使用
- **位置：** L887-914，Pagefind覆盖样式共27处`!important`
- **影响：** 优先级混乱，难以维护
- **建议：** 提高选择器特异性而非依赖`!important`

### 9. H1层级混乱
- **问题：** 全局`h1`与`.hero h1`、`.prose h1`存在样式冲突
- **证据：** L111的h1被L573的`.hero h1`覆盖
- **建议：** 统一使用语义化class替代标签选择器

### 10. 缺少letter-spacing token
- **问题：** `-0.02em`、`-0.03em`、`0.08em`等值散落各处
- **建议：**
```css
:root {
  --ls-tight: -0.02em;
  --ls-tighter: -0.03em;
  --ls-loose: 0.08em;
}
```

### 11. 表格响应式处理缺陷
- **位置：** L258-288
- **问题：** `.prose table`使用`overflow-x: auto`但父容器可能受限
- **建议：** 添加wrapper容器处理横向滚动

### 12. 按钮目标尺寸不足
- **问题：** `.menu-toggle` padding仅0.5rem，触摸区域约22×22px
- **建议：** 确保触摸目标≥44×44px

---

## 🟢 优点

1. **clamp()响应式字体** - H1-H3使用clamp实现平滑缩放
2. **Focus可见性** - `:focus-visible`定义清晰
3. **语义化HTML** - 使用article、section、nav等语义标签
4. **Dark mode支持** - 基础深色模式已实现
5. **无障碍ARIA** - 菜单按钮有aria-label和aria-expanded
6. **Skip link** - 提供键盘导航跳过链接
7. **CSS变量组织** - 颜色、字体、圆角已token化

---

## 🏗️ 设计Token建议

```css
/* src/styles/tokens.css */
:root {
  /* ── Typography Scale (1.25 ratio) ── */
  --fs-xs: 0.75rem;     /* 12px */
  --fs-sm: 0.875rem;    /* 14px */
  --fs-base: 1rem;      /* 16px */
  --fs-md: 1.125rem;    /* 18px */
  --fs-lg: 1.25rem;     /* 20px */
  --fs-xl: 1.5rem;      /* 24px */
  --fs-2xl: 2rem;       /* 32px */
  --fs-3xl: 2.5rem;     /* 40px */
  --fs-4xl: 3rem;       /* 48px */
  --fs-5xl: 3.5rem;     /* 56px */

  /* ── Line Heights ── */
  --lh-tight: 1.2;
  --lh-normal: 1.5;
  --lh-relaxed: 1.75;

  /* ── Letter Spacing ── */
  --ls-tight: -0.02em;
  --ls-normal: 0;
  --ls-loose: 0.08em;

  /* ── Spacing Scale (4px base) ── */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* ── Border Radius ── */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* ── Breakpoints ── */
  --bp-mobile: 768px;
  --bp-tablet: 1024px;
  --bp-desktop: 1440px;

  /* ── Font Families ── */
  --font-heading: 'Outfit', system-ui, sans-serif;
  --font-body: 'Work Sans', system-ui, sans-serif;
  --font-mono: 'SF Mono', Monaco, monospace;
}
```

---

## 📋 行动清单

| # | 行动 | 文件 | 优先级 | 工作量 |
|---|------|------|--------|--------|
| 1 | 修复iOS输入框缩放 | global.css L887 | 🔴 | 5min |
| 2 | 提升badge/search-result最小字号 | global.css L625, L934 | 🔴 | 5min |
| 3 | 完善深色模式变量 | global.css L983 | 🔴 | 15min |
| 4 | 合并重复CSS变量 | global.css L40, L876 | 🔴 | 10min |
| 5 | 引入spacing/token变量 | global.css | 🟡 | 30min |
| 6 | 统一行高值 | global.css | 🟡 | 15min |
| 7 | 减少!important使用 | global.css L887-914 | 🟡 | 1h |
| 8 | 添加断点token | global.css | 🟡 | 15min |
| 9 | 检查触摸目标尺寸 | Header.astro | 🟡 | 10min |
| 10 | 验证表格响应式 | global.css L258 | 🟢 | 10min |
| 11 | 添加letter-spacing token | global.css | 🟢 | 15min |
| 12 | 重构h1选择器冲突 | global.css L111, L573 | 🟢 | 20min |

---

## ⚠️ 架构决策

1. **字号比例选择：** 当前使用近似1.25比例，建议明确采用Modern Scale (1.25)或Perfect Fourth (1.333)
2. **Token策略：** 建议拆分tokens.css独立文件，便于主题切换
3. **断点管理：** 考虑使用CSS容器查询替代媒体查询，提升组件复用性

---

*报告生成时间：2026-09-29*
