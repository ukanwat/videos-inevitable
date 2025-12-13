# Tech Stack Documentation

## Project Overview
Technical deep-dive video: "From Transformers to Agents: The 7-Year Journey"
- Duration: 7-8 minutes
- Target Audience: ML practitioners and technical audience
- Platform: Remotion + React 19 + TypeScript

---

## Technology Choices

### Core Framework
**Remotion 4.0.375**
- Frame-by-frame control for precise animation timing
- React-based component architecture
- Programmatic video generation
- Perfect sync between narration and visuals

**React 19.0.0**
- Latest features and performance improvements
- Component-based architecture for reusable visualizations
- TypeScript support for type safety

**Tailwind CSS v4.0**
- Utility-first styling
- Consistent design system
- Fast prototyping

**shadcn/ui (latest)**
- Pre-built, accessible UI components
- Built on Radix UI primitives
- Customizable with Tailwind CSS
- Copy-paste components (not a dependency)
- Clean, modern aesthetic for video elements

**Why shadcn for video:**
While shadcn is typically for interactive apps, we're using it for:
- Clean card layouts for code snippets and formulas
- Consistent spacing and typography
- Professional UI elements (tabs, separators, badges)
- Quick prototyping of visual elements
- Note: Interactive features (hover, focus) are ignored in rendered video

**Example Use:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card className="bg-slate-900/50 backdrop-blur-sm">
  <CardHeader>
    <CardTitle>Attention Mechanism</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Visualization here */}
  </CardContent>
</Card>
```

---

## Animation Libraries

### GSAP (GreenSock) v3.13.0
**Why:** Industry-standard for complex timeline-based animations

**Use Cases:**
- Complex sequences (ReAct loop iterations)
- SVG morphing (workflow → agent transitions)
- Timeline scrubbing synchronized with Remotion frames
- Choreographing multiple elements simultaneously

**Example Use:**
```tsx
gsap.timeline()
  .to('.attention-head', { rotation: 360, duration: 2 })
  .to('.token', { x: 100 }, '-=0.5'); // overlap by 0.5s
```

### Framer Motion v12.23.24
**Why:** React-first declarative animations for UI transitions

**Use Cases:**
- Simple UI state transitions (cards appearing/disappearing)
- Layout animations
- Shared element transitions
- Component enter/exit animations

**Example Use:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>
```

**Decision:** Use GSAP for complex sequences, Framer Motion for simple UI animations

### Lottie React v2.5.0
**Why:** High-quality, production-ready animations from After Effects

**Use Cases:**
- Complex character or icon animations
- Loading spinners and transitions
- Branded motion graphics
- Decorative elements and illustrations

**Example Use:**
```tsx
import Lottie from "lottie-react";
import animationData from "./animation.json";

<Lottie
  animationData={animationData}
  loop={true}
  style={{ width: 300, height: 300 }}
/>
```

**Resources:** [LottieFiles](https://lottiefiles.com) - 1000s of free animations

### Rough Notation v0.5.1
**Why:** Hand-drawn annotations for adding personality to technical content

**Use Cases:**
- Underlining key formulas or terms
- Boxing important concepts
- Circling code snippets or diagram elements
- Adding informal, friendly emphasis
- Creating sketchy visual style

**Example Use:**
```tsx
import { annotate } from "rough-notation";

const annotation = annotate(element, {
  type: 'underline',
  color: 'red',
  strokeWidth: 2
});
annotation.show();
```

**Annotation Types:** underline, box, circle, highlight, strike-through, crossed-off, bracket

---

## Data Visualization

### D3.js v7.9.0
**Why:** Full control over custom visualizations

**Use Cases:**
- Attention weights matrix (heatmap with custom interactions)
- Token flow diagrams
- Custom probability distributions
- Any visualization requiring precise pixel control

**Example Use:**
```tsx
const xScale = d3.scaleLinear()
  .domain([0, tokens.length])
  .range([0, width]);
```

### Recharts v3.4.1
**Why:** Pre-built chart components for standard visualizations

**Use Cases:**
- Temperature probability distributions (bar charts)
- Context window growth (line charts)
- Autonomy-reliability trade-off plot (2D scatter)

**Example Use:**
```tsx
<LineChart data={contextGrowthData}>
  <Line dataKey="tokens" stroke="#3b82f6" />
  <XAxis dataKey="iteration" />
</LineChart>
```

**Note:** Tremor was excluded due to React 19 incompatibility

**Decision:** D3.js for custom unique visuals, Recharts for standard charts

---

## Code & Math Rendering

### Shiki v3.15.0
**Why:** Modern syntax highlighting using VSCode's tokenizer

**Advantages:**
- Most accurate syntax highlighting
- Supports all major languages
- Same highlighting as VSCode
- Theme support

**Use Cases:**
- Python code snippets (ReAct format, PPO objective)
- JavaScript/TypeScript examples
- JSON schemas (function definitions)
- Bash commands

**Example Use:**
```tsx
import { codeToHtml } from 'shiki';

const html = await codeToHtml(code, {
  lang: 'python',
  theme: 'github-dark'
});
```

**Note:** Larger bundle size but worth it for accuracy

### KaTeX v0.16.25 + react-katex v3.1.0
**Why:** Fast, synchronous math rendering

**Advantages:**
- Faster than MathJax (synchronous vs async)
- Smaller bundle size (~100KB)
- Sufficient for our equations
- Good browser support

**Use Cases:**
- Attention mechanism formula: `scores = Q·K^T / √d_k`
- PPO objective function
- Softmax equations
- Temperature reshaping formulas

**Example Use:**
```tsx
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

<BlockMath math="\text{scores} = \frac{Q \cdot K^T}{\sqrt{d_k}}" />
```

---

## Icons & Logos

### Lucide React v0.468.0
**Why:** Beautiful, consistent icon set with 1000+ icons

**Use Cases:**
- UI icons (arrows, checkmarks, stars, etc.)
- Decorative elements
- Technical diagrams (gears, code, database icons)
- General purpose iconography

**Example Use:**
```tsx
import { Sparkles, Zap, Brain, ArrowRight, Check } from "lucide-react";

<Sparkles size={48} color="hsl(var(--primary))" strokeWidth={2} />
<Brain size={64} className="text-accent" />
```

**Resources:** [Lucide Icons](https://lucide.dev/icons) - Browse all icons

### @icons-pack/react-simple-icons v13.8.0
**Why:** 2600+ brand logos as React components

**Use Cases:**
- Company logos (OpenAI, Google, Anthropic, Meta)
- Tech stack icons
- Consistent, recognizable brand icons

**Example Use:**
```tsx
import { SiOpenai, SiGoogle, SiAnthropic } from '@icons-pack/react-simple-icons';

<SiOpenai size={48} color="#10A37F" />
```

### Brandfetch API
**Why:** Dynamic logo fetching for companies not in simple-icons

**Configuration:**
```env
BRANDFETCH_API_KEY=1idm6h-g0sLQterbX_Z
```

**Component Available:** `<BrandLogo />` - Fetch and display brand logos by domain

**Example Use:**
```tsx
import { BrandLogo } from "@/components/media";

// Using the BrandLogo component (recommended)
<BrandLogo
  domain="openai.com"
  size="lg"
  variant="icon"
  animateIn="scale"
  startFrame={0}
/>

// Direct API usage (manual)
<img
  src={`https://cdn.brandfetch.io/anthropic.com?c=${process.env.BRANDFETCH_API_KEY}`}
  alt="Anthropic Logo"
/>
```

**Decision:** Simple Icons for tech companies, Brandfetch for others

---

## What We're NOT Using (and Why)

### Component Libraries
✅ **shadcn/ui** - NOW INCLUDED: Using for clean UI layouts despite being designed for interactive apps
❌ **Tremor** - React 19 incompatibility
❌ **Aceternity UI** - Decided to use shadcn + custom components instead

### Workflow Diagrams
❌ **React Flow** - Not designed for animation-first workflows
❌ **Mermaid.js** - Low visual quality
❌ **Excalidraw/tldraw** - Hand-drawn style not suitable

### Other Icons
❌ **Lucide React** - Not needed, simple-icons covers our use cases

**Decision:** Custom SVG components with GSAP for workflow diagrams

---

## Architecture Pattern

### Visualization Strategy
```
Custom SVG + GSAP for:
- Attention mechanism
- Workflow DAGs
- ReAct loop iterations
- Token flow animations

Recharts for:
- Standard charts
- Probability distributions
- Growth metrics

D3.js for:
- Attention weights heatmap
- Custom data-driven visualizations
```

### Component Organization
```
src/
├── compositions/           # Main video sequences
│   ├── AttentionMechanism.tsx
│   ├── RLHFSection.tsx
│   ├── FunctionCalling.tsx
│   └── AgentsSection.tsx
├── components/             # Reusable components
│   ├── CodeBlock.tsx
│   ├── MathFormula.tsx
│   ├── Chart.tsx
│   └── Logo.tsx
├── visualizations/         # Complex visualizations
│   ├── AttentionWeights.tsx
│   ├── ReActLoop.tsx
│   └── WorkflowDiagram.tsx
└── utils/                  # Helper functions
    ├── animations.ts
    ├── colors.ts
    └── data.ts
```

---

## Performance Considerations

1. **Bundle Size:** Shiki is large, but worth it for accurate highlighting
2. **Render Time:** GSAP timeline animations are performant even with many elements
3. **Frame Rate:** Target 30fps for smooth playback
4. **Memory:** D3.js can be memory-intensive with large datasets - optimize as needed

---

## Development Workflow

1. **Build visualizations in isolation** - Test each component separately
2. **Compose into sequences** - Combine components into timed sequences
3. **Sync with narration** - Use Remotion's frame timing
4. **Optimize render** - Profile and optimize heavy animations

---

## Key Dependencies Summary

| Category | Library | Version | Primary Use |
|----------|---------|---------|-------------|
| Framework | Remotion | 4.0.375 | Video generation |
| UI | React | 19.0.0 | Component architecture |
| Styling | Tailwind CSS | 4.0.0 | Utility styling |
| Components | shadcn/ui | latest | Pre-built UI components |
| Animation (Complex) | GSAP | 3.13.0 | Timeline sequences |
| Animation (Simple) | Framer Motion | 12.23.24 | UI transitions |
| Viz (Custom) | D3.js | 7.9.0 | Custom data viz |
| Viz (Charts) | Recharts | 3.4.1 | Standard charts |
| Code Syntax | Shiki | 3.15.0 | Code highlighting |
| Math | KaTeX | 0.16.25 | Formula rendering |
| Icons | react-simple-icons | 13.8.0 | Brand logos |

---

## Next Steps

1. Set up component structure
2. Build core visualization components
3. Create composition sequences
4. Add narration timing
5. Test and optimize render
