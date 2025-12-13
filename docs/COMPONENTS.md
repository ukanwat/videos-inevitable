# Core Components Library

Comprehensive component library for creating high-quality, animated technical videos with Remotion.

---

## Overview

This library provides **video-first** components optimized for Remotion. Every component is designed with:
- **Animation-first approach**: All elements animate in/out smoothly
- **Theme-based colors**: Using CSS variables, no hardcoded colors
- **Frame-perfect timing**: Synchronized with Remotion's frame system
- **Non-interactive**: Optimized for video rendering, not user interaction

---

## Advanced Graphics Libraries

### Lottie Animations (`lottie-react`)

**When to Use:**
- Complex, production-quality animations (character animations, loading spinners, decorative elements)
- Animations created in After Effects or exported from LottieFiles
- Smooth, vector-based motion graphics
- Branded animations or illustrations

**Installation:** ✅ Already installed

**Usage:**
```tsx
import Lottie from "lottie-react";
import animationData from "./animation.json";

<Lottie
  animationData={animationData}
  loop={true}
  autoplay={true}
  style={{ width: 300, height: 300 }}
/>
```

**Resources:**
- [LottieFiles](https://lottiefiles.com) - Free animations library
- [Lottie React Docs](https://lottiereact.com/)

### Rough Notation (`rough-notation`)

**When to Use:**
- Hand-drawn style annotations (underlines, circles, boxes, highlights)
- Adding emphasis to text or elements with personality
- Technical explanations with casual, friendly feel
- Annotating diagrams, highlighting key terms
- Creating sketchy, informal visual style

**Installation:** ✅ Already installed

**Usage:**
```tsx
import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";

const AnnotatedText = () => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      const annotation = annotate(ref.current, {
        type: 'underline',
        color: 'red',
        strokeWidth: 2,
      });
      annotation.show();
    }
  }, []);

  return <span ref={ref}>Important text</span>;
};
```

**Annotation Types:**
- `underline` - Underline text
- `box` - Box around text
- `circle` - Circle around text
- `highlight` - Highlight background
- `strike-through` - Strike through text
- `crossed-off` - Cross off text
- `bracket` - Left or right bracket

**Use Cases:**
- Highlighting key formulas or concepts
- Annotating code snippets
- Creating emphasis in explanations
- Adding visual personality to technical content

**Resources:**
- [Rough Notation Docs](https://roughnotation.com/)

---

## Component Categories

### 1. Animation Primitives (`/components/animation`)

Base animation wrappers used throughout the library.

#### `FadeIn`
Simple opacity fade animation.

```tsx
<FadeIn startFrame={0} duration={30}>
  <div>Content fades in</div>
</FadeIn>
```

**Props:**
- `startFrame?: number` - Frame to start animation (default: 0)
- `duration?: number` - Animation duration in frames (default: TIMING.NORMAL = 30)
- `delay?: number` - Additional delay in frames
- `className?: string`

#### `SlideIn`
Slide animation from any direction.

```tsx
<SlideIn direction="up" startFrame={0} duration={30} distance={20}>
  <div>Content slides in</div>
</SlideIn>
```

**Props:**
- `direction?: "left" | "right" | "up" | "down"` (default: "up")
- `distance?: number` - Distance in pixels (default: 20)
- `startFrame?: number`
- `duration?: number`
- `delay?: number`
- `className?: string`

#### `ScaleIn`
Scale animation with optional overshoot.

```tsx
<ScaleIn startFrame={0} from={0.9}>
  <div>Content scales in</div>
</ScaleIn>
```

**Props:**
- `from?: number` - Starting scale (default: 0.9)
- `startFrame?: number`
- `duration?: number`
- `delay?: number`
- `className?: string`

#### `SequentialReveal`
Reveal multiple children sequentially.

```tsx
<SequentialReveal
  startFrame={0}
  itemDelay={10}
  animationType="fade"
>
  {items.map(item => <div key={item.id}>{item}</div>)}
</SequentialReveal>
```

**Props:**
- `children: React.ReactNode[]` - Array of elements to reveal
- `startFrame?: number`
- `itemDelay?: number` - Frames between each item (default: TIMING.STAGGER_NORMAL = 10)
- `itemDuration?: number` - Duration of each animation
- `animationType?: "fade" | "slide"`
- `slideDirection?: "left" | "right" | "up" | "down"`
- `className?: string`

#### `Highlight`
Pulsing highlight/glow effect.

```tsx
<Highlight startFrame={0} duration={60} pulseCount={2}>
  <div>Highlighted content</div>
</Highlight>
```

**Props:**
- `startFrame?: number`
- `duration?: number` (default: TIMING.SLOW = 60)
- `color?: string` - Border/glow color (default: theme primary)
- `pulseCount?: number` - Number of pulses (default: 2)
- `className?: string`

---

### 2. Text Components (`/components/text`)

#### `Title`
Animated section titles with variant styles.

```tsx
<Title
  text="Section 1: The Foundation"
  variant="main"
  animationType="slideUp"
  startFrame={0}
/>
```

**Props:**
- `text: string` - Title text
- `variant?: "main" | "section" | "inline"` (default: "section")
  - `main`: 4xl/5xl, bold, primary color
  - `section`: 3xl/4xl, semibold
  - `inline`: xl/2xl, medium
- `animationType?: "fade" | "slideUp" | "slideLeft"` (default: "slideUp")
- `startFrame?: number`
- `duration?: number` - Auto-adjusted based on variant
- `className?: string`

#### `AnimatedText`
Flexible text animation component with multiple animation styles. **Remotion-native** with frame-perfect timing.

**Character Reveal:**
```tsx
<AnimatedText
  animation="characterReveal"
  staggerDelay={3}
  className="text-4xl font-bold"
>
  Hello World
</AnimatedText>
```

**Blur In:**
```tsx
<AnimatedText
  animation="blur"
  duration={30}
  className="text-6xl font-bold text-[hsl(var(--electric-blue))]"
>
  Welcome
</AnimatedText>
```

**Typewriter:**
```tsx
<AnimatedText
  animation="typewriter"
  showCursor
  cursorStyle="block"
  charsPerFrame={0.5}
  className="font-mono text-lg"
>
  const x = 42;
</AnimatedText>
```

**Slide Up By Word:**
```tsx
<AnimatedText
  animation="slideUpByWord"
  staggerDelay={5}
  className="text-3xl"
>
  Words slide up one by one
</AnimatedText>
```

**Rough Notation (Hand-drawn underline):**
```tsx
<AnimatedText
  animation="roughNotation"
  roughType="underline"
  roughColor="hsl(var(--yellow))"
  roughAnimationDuration={60}
  className="text-2xl font-bold"
>
  Important concept
</AnimatedText>
```

**Props:**
- `children: string` - Text content to animate
- `animation?: AnimationType` - Animation type:
  - `"characterReveal"` - Characters fade in one by one (default)
  - `"wordReveal"` - Words fade in one by one
  - `"lineReveal"` - Lines fade in one by one
  - `"blur"` - Entire text blurs in from unfocused to sharp
  - `"blurByCharacter"` - Each character blurs in individually
  - `"typewriter"` - Typing effect with optional cursor
  - `"slideUp"` / `"slideDown"` / `"slideLeft"` / `"slideRight"` - Character-by-character slide
  - `"slideUpByWord"` / `"slideDownByWord"` - Word-by-word slide
  - `"roughNotation"` - Hand-drawn annotations (underline, circle, box, etc.)
- `by?: "character" | "word" | "line"` - How to split text for reveal animations
- `startFrame?: number` (default: 0) - When to start animation
- `staggerDelay?: number` (default: 3) - Frames between each character/word
- `duration?: number` (default: 15) - Duration for each unit's animation
- `className?: string` - Tailwind classes for styling

**Typewriter Props:**
- `showCursor?: boolean` (default: true)
- `cursorStyle?: "line" | "block" | "underscore"` (default: "line")
- `charsPerFrame?: number` (default: 0.5) - Typing speed

**Rough Notation Props:**
- `roughType?: "underline" | "box" | "circle" | "highlight" | "strike-through" | "crossed-off" | "bracket"` (default: "underline")
- `roughColor?: string` (default: "hsl(var(--yellow))")
- `roughStrokeWidth?: number` (default: 2)
- `roughAnimationDuration?: number` (default: 60) - Frames to draw annotation

**Use Cases:**
- **Titles & Headers** - characterReveal, blur, slideUp
- **Emphasis & Highlights** - roughNotation with underline or highlight
- **Code Examples** - typewriter with monospace font
- **Lists & Bullet Points** - wordReveal, slideUpByWord
- **Poetry & Quotes** - lineReveal, blurByCharacter

**Works Anywhere:** Unlike Title, AnimatedText is unstyled by default. Use `className` to control all styling.

#### `CodeBlock`
Syntax-highlighted code with **line-by-line reveal**.

```tsx
<CodeBlock
  code={`def attention(Q, K, V):
    scores = Q @ K.T / sqrt(d_k)
    weights = softmax(scores)
    return weights @ V`}
  language="python"
  startFrame={0}
  lineDelay={10}
  highlightLines={[2, 3]}
  caption="Attention Mechanism"
  showLineNumbers
/>
```

**Props:**
- `code: string` - Code content
- `language: string` - Language for syntax highlighting (python, typescript, json, etc.)
- `startFrame?: number`
- `linesToShow?: number[]` - Show only specific lines (1-indexed)
- `highlightLines?: number[]` - Lines to highlight (1-indexed)
- `lineDelay?: number` - Frames between each line (default: TIMING.LINE_DELAY = 10)
- `caption?: string` - Optional label above code
- `showLineNumbers?: boolean` (default: true)
- `theme?: "github-dark" | "github-light"` (default: "github-light")
- `className?: string`

**Animation:** Each line fades in sequentially with `lineDelay` between lines.

#### `MathFormula`
KaTeX-rendered mathematical formulas.

```tsx
<MathFormula
  latex="\frac{Q \cdot K^T}{\sqrt{d_k}}"
  startFrame={0}
/>

<MathFormula
  latex="E = mc^2"
  inline
  startFrame={30}
/>
```

**Props:**
- `latex: string` - LaTeX formula
- `inline?: boolean` (default: false)
- `startFrame?: number`
- `duration?: number` (default: TIMING.NORMAL = 30)
- `className?: string`

---

### 3. Media Components (`/components/media`)

#### `BrandLogo`
Fetches and displays brand logos using the Brandfetch API.

```tsx
<BrandLogo
  domain="openai.com"
  size="lg"
  variant="icon"
  animateIn="scale"
  startFrame={0}
/>
```

**Props:**
- `domain: string` - Company domain (e.g., "openai.com", "anthropic.com")
- `size?: "sm" | "md" | "lg" | "xl"` (default: "md")
  - `sm`: 48px × 48px
  - `md`: 96px × 96px
  - `lg`: 128px × 128px
  - `xl`: 192px × 192px
- `variant?: "icon" | "logo"` (default: "icon")
  - `icon`: Square logo/symbol only
  - `logo`: Full logo with text
- `startFrame?: number`
- `animateIn?: "fade" | "scale" | "none"` (default: "scale")
- `className?: string`
- `fallbackText?: string` - Text to display if logo fails to load

**Use Cases:**
- Showing company logos (OpenAI, Anthropic, Google, etc.)
- Paper author affiliations
- Tech stack visualizations
- Timeline events with brand logos

#### `Image`
Custom image with source attribution and caption overlays.

```tsx
<Image
  src="/path/to/image.jpg"
  alt="Transformer architecture"
  source="Source: OpenAI"
  caption="The attention mechanism"
  variant="rounded"
  animateIn="scale"
  startFrame={0}
/>
```

**Props:**
- `src: string` - Image path
- `alt: string` - Alt text
- `source?: string` - Source attribution (displayed top-left)
- `caption?: string` - Caption (displayed bottom)
- `variant?: "rounded" | "straight"` (default: "rounded")
- `fit?: "cover" | "contain"` (default: "cover")
- `startFrame?: number`
- `animateIn?: "fade" | "scale" | "slide"` (default: "fade")
- `className?: string`

**Visual Design:**
- Source overlay: Top-left, semi-transparent background with backdrop blur
- Caption: Bottom, full-width bar with backdrop blur
- Variant controls border radius

---

### 4. Chat Components (`/components/chat`)

#### `ChatBubble`
Single chat message with role-based styling.

```tsx
<ChatBubble
  role="user"
  message="What's the capital of France?"
  startFrame={0}
/>

<ChatBubble
  role="assistant"
  message="The capital of France is Paris."
  startFrame={30}
/>
```

**Props:**
- `role: "user" | "assistant" | "system"`
- `message: string`
- `startFrame?: number`
- `avatar?: string` - Optional avatar image
- `className?: string`

**Styling:**
- `user`: Primary color, right-aligned, slides from right
- `assistant`: Muted color, left-aligned, slides from left
- `system`: Secondary color, centered, slides from bottom

#### `ThoughtActionObservation`
ReAct format display for agent reasoning.

```tsx
<ThoughtActionObservation
  type="thought"
  content="I need to search for European cities above 45°N latitude."
  startFrame={0}
/>

<ThoughtActionObservation
  type="action"
  content='search("European cities above 45 degrees north")'
  startFrame={30}
/>

<ThoughtActionObservation
  type="observation"
  content="Major cities include Milan, Lyon, Geneva..."
  startFrame={60}
/>
```

**Props:**
- `type: "thought" | "action" | "observation"`
- `content: string`
- `startFrame?: number`
- `className?: string`

**Styling:**
- `thought`: Accent background, italic, indented
- `action`: Primary background (light), monospace, border-left
- `observation`: Muted background, normal font

#### `ChatComparison`
Side-by-side comparison for RLHF preference examples.

```tsx
<ChatComparison
  query="Explain quantum entanglement"
  responseA="Quantum entanglement is when particles are correlated..."
  responseB="Idk google it lol"
  selected="A"
  labelA="Response A"
  labelB="Response B"
  startFrame={0}
/>
```

**Props:**
- `query: string`
- `responseA: string`
- `responseB: string`
- `selected?: "A" | "B"` - Which response is preferred
- `labelA?: string` (default: "Response A")
- `labelB?: string` (default: "Response B")
- `startFrame?: number`
- `className?: string`

**Visual Design:**
- Query displayed at top (centered)
- Responses in grid layout (50/50 split)
- Selected response: Green border and background tint
- Non-selected: Dimmed opacity

---

### 5. Layout Components (`/components/layout`)

#### `VideoCard`
Container card with animation variants.

```tsx
<VideoCard title="Feature" variant="emphasis" startFrame={0}>
  <p>Card content here</p>
</VideoCard>
```

**Props:**
- `title?: string` - Optional title
- `children: React.ReactNode`
- `variant?: "default" | "emphasis" | "muted"` (default: "default")
- `startFrame?: number`
- `className?: string`

**Styling:**
- `default`: Standard card background
- `emphasis`: Accent background with border
- `muted`: Subtle muted appearance

#### `SplitView`
Side-by-side comparison layout.

```tsx
<SplitView
  left={<CodeBlock code="before" />}
  right={<CodeBlock code="after" />}
  leftLabel="Before"
  rightLabel="After"
  startFrame={0}
/>
```

**Props:**
- `left: React.ReactNode`
- `right: React.ReactNode`
- `leftLabel?: string`
- `rightLabel?: string`
- `split?: number` - Split percentage (default: 50)
- `startFrame?: number`
- `className?: string`

#### `Section`
Full-screen section wrapper with title.

```tsx
<Section
  title="Introduction"
  subtitle="Understanding the basics"
  background="gradient"
  startFrame={0}
>
  <div>Section content</div>
</Section>
```

**Props:**
- `title?: string`
- `subtitle?: string`
- `children: React.ReactNode`
- `background?: "solid" | "gradient"`
- `backgroundGradient?: string` - Custom gradient
- `startFrame?: number`
- `className?: string`

#### `Grid`
Responsive grid layout with stagger.

```tsx
<Grid columns={3} gap={4} stagger startFrame={0}>
  {items.map(item => <VideoCard key={item.id}>{item}</VideoCard>)}
</Grid>
```

**Props:**
- `children: React.ReactNode`
- `columns?: number` (default: 2)
- `gap?: number` - Gap in Tailwind units (default: 4)
- `stagger?: boolean` (default: false)
- `staggerDelay?: number` (default: TIMING.STAGGER_NORMAL)
- `startFrame?: number`
- `className?: string`

---

### 6. Visualization Components (`/components/visualization`)

#### `BarChart`
Animated bar chart using Recharts.

```tsx
<BarChart
  data={[
    { label: "cat", value: 0.8 },
    { label: "dog", value: 0.15 },
    { label: "bird", value: 0.05 },
  ]}
  maxValue={1}
  startFrame={0}
  showValues
/>
```

**Props:**
- `data: Array<{ label: string; value: number }>`
- `maxValue?: number` - Y-axis max
- `startFrame?: number`
- `animationDuration?: number` (default: TIMING.SLOW)
- `showValues?: boolean` (default: false)
- `orientation?: "vertical" | "horizontal"` (default: "vertical")
- `className?: string`

#### `LineChart`
Progressive line drawing chart.

```tsx
<LineChart
  data={[
    { x: "Q1", y: 100 },
    { x: "Q2", y: 150 },
    { x: "Q3", y: 200 },
  ]}
  xLabel="Quarter"
  yLabel="Revenue"
  startFrame={0}
/>
```

**Props:**
- `data: Array<{ x: string; y: number }>`
- `xLabel?: string`
- `yLabel?: string`
- `startFrame?: number`
- `drawDuration?: number` (default: TIMING.SLOW)
- `color?: string` (default: theme primary)
- `className?: string`

#### `HeatMap`
2D heatmap for attention weights or matrices.

```tsx
<HeatMap
  data={[
    [0.8, 0.1, 0.05, 0.05],
    [0.2, 0.6, 0.1, 0.1],
    [0.1, 0.2, 0.5, 0.2],
  ]}
  labels={["The", "cat", "sat", "on"]}
  startFrame={0}
  highlightCell={[0, 1]}
/>
```

**Props:**
- `data: number[][]` - 2D array of values (0-1 normalized)
- `labels?: string[]` - Row/column labels
- `startFrame?: number`
- `highlightCell?: [number, number]` - [row, col] to highlight
- `colorScheme?: "blue" | "green" | "red"` (default: "blue")
- `className?: string`

#### `ProgressBar`
Animated progress bar with zones.

```tsx
<ProgressBar
  current={3200}
  max={8000}
  label="Token Usage"
  startFrame={0}
  zones={[
    { threshold: 0, color: "hsl(var(--chart-2))" },
    { threshold: 50, color: "#f59e0b" },
    { threshold: 80, color: "hsl(var(--destructive))" },
  ]}
/>
```

**Props:**
- `current: number`
- `max: number`
- `label?: string`
- `startFrame?: number`
- `zones?: Array<{ threshold: number; color: string }>` - Color zones by percentage
- `orientation?: "horizontal" | "vertical"` (default: "horizontal")
- `showPercentage?: boolean` (default: true)
- `className?: string`

---

### 7. Diagram Components (`/components/diagram`)

#### `WorkflowNode`
Individual workflow step with status.

```tsx
<WorkflowNode
  label="Process Data"
  status="active"
  data="Processing 1024 items..."
  startFrame={0}
/>
```

**Props:**
- `label: string`
- `data?: string` - Input/output data shown
- `status?: "pending" | "active" | "complete" | "error"` (default: "pending")
- `startFrame?: number`
- `className?: string`

**Status Styling:**
- `pending`: Muted colors
- `active`: Primary colors with pulsing glow
- `complete`: Green colors
- `error`: Red/destructive colors

#### `Timeline`
Horizontal timeline with events.

```tsx
<Timeline
  events={[
    { year: "2017", label: "Transformers", description: "Attention mechanism" },
    { year: "2020", label: "GPT-3", description: "Few-shot learning" },
    { year: "2022", label: "ChatGPT", description: "Conversational AI" },
  ]}
  startFrame={0}
/>
```

**Props:**
- `events: Array<{ year: string; label: string; description?: string }>`
- `startFrame?: number`
- `eventDelay?: number` (default: TIMING.STAGGER_LONG)
- `className?: string`

#### `FlowDiagram`
SVG-based flow diagrams with nodes and edges.

```tsx
<FlowDiagram
  nodes={[
    { id: "start", label: "Start", type: "circle", x: 0, y: 0 },
    { id: "process", label: "Process", type: "rect", x: 0, y: 0 },
    { id: "end", label: "End", type: "circle", x: 0, y: 0 },
  ]}
  edges={[
    { from: "start", to: "process" },
    { from: "process", to: "end", label: "Success" },
  ]}
  activeNodes={["process"]}
  startFrame={0}
  layout="horizontal"
/>
```

**Props:**
- `nodes: Array<FlowNode>` - { id, label, type?, x, y }
- `edges: Array<FlowEdge>` - { from, to, label? }
- `activeNodes?: string[]` - Node IDs to highlight
- `startFrame?: number`
- `layout?: "horizontal" | "vertical" | "custom"` (default: "horizontal")
- `className?: string`

**Node Types:**
- `rect`: Rectangle (default)
- `circle`: Circle
- `diamond`: Diamond

---

### 8. Specialized Components (`/components/specialized`)

#### `AnimatedBeam`
Flowing beam animation between elements.

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const fromRef = useRef<HTMLDivElement>(null);
const toRef = useRef<HTMLDivElement>(null);

<div ref={containerRef} className="relative">
  <div ref={fromRef}>Source</div>
  <div ref={toRef}>Target</div>

  <AnimatedBeam
    containerRef={containerRef}
    fromRef={fromRef}
    toRef={toRef}
    curvature={50}
    startFrame={0}
    loop
  />
</div>
```

**Props:**
- `containerRef: React.RefObject<HTMLElement>` - Container element
- `fromRef: React.RefObject<HTMLElement>` - Source element
- `toRef: React.RefObject<HTMLElement>` - Target element
- `curvature?: number` - Path curvature (default: 0)
- `reverse?: boolean` - Reverse direction (default: false)
- `pathColor?: string` - Static path color
- `pathWidth?: number` (default: 2)
- `pathOpacity?: number` (default: 0.2)
- `gradientStartColor?: string` - Beam start color
- `gradientStopColor?: string` - Beam end color
- `delay?: number` - Additional delay in frames
- `duration?: number` - Animation duration (default: TIMING.SLOW)
- `startFrame?: number`
- `loop?: boolean` - Loop animation (default: true)

**Use Cases:**
- Function call flows (data moving between steps)
- Attention visualization (beams from source to targets)
- Workflow nodes (data passing between nodes)
- Agent communication

#### `ContextWindow`
Token usage visualization with iteration history.

```tsx
<ContextWindow
  current={3200}
  max={8000}
  iterations={[
    { iteration: 1, tokens: 800 },
    { iteration: 2, tokens: 1400 },
    { iteration: 3, tokens: 2000 },
  ]}
  startFrame={0}
/>
```

**Props:**
- `current: number` - Current token count
- `max: number` - Maximum tokens
- `iterations?: Array<{ iteration: number; tokens: number }>`
- `startFrame?: number`
- `label?: string` (default: "Context Window")
- `className?: string`

#### `AttentionVisualization`
Token attention weights with curved lines.

```tsx
<AttentionVisualization
  tokens={["The", "cat", "sat", "on", "the", "mat"]}
  weights={[
    [0.1, 0.2, 0.1, 0.05, 0.5, 0.05],
    [0.2, 0.1, 0.3, 0.1, 0.2, 0.1],
    // ... more weight rows
  ]}
  sourceIndex={4}
  startFrame={0}
/>
```

**Props:**
- `tokens: string[]` - Token list
- `weights: number[][]` - Attention weight matrix (tokens × tokens)
- `sourceIndex?: number` - Highlight attention from this token
- `startFrame?: number`
- `animationDuration?: number` (default: TIMING.SLOW)
- `className?: string`

#### `FunctionCallFlow`
5-step function calling visualization.

```tsx
<FunctionCallFlow
  userMessage="What's the weather in Tokyo?"
  functionCall={{
    function: "get_weather",
    arguments: { location: "Tokyo", unit: "celsius" },
  }}
  apiResponse={{ temp: 22, condition: "sunny" }}
  modelResponse="It's currently 22°C and sunny in Tokyo."
  startFrame={0}
/>
```

**Props:**
- `userMessage: string`
- `functionCall: { function: string; arguments: Record<string, any> }`
- `apiResponse: Record<string, any>`
- `modelResponse: string`
- `startFrame?: number`
- `className?: string`

**Visual Design:**
- 5 sequential steps with stagger
- Uses CodeBlock for JSON display
- Shows full flow from user query to final response

---

## Animation Utilities (`/utils/animations.ts`)

Common animation pattern helpers for Remotion.

### Easing Functions

```typescript
import { Easing } from "@/utils/animations";

// Use in custom animations
const progress = Easing.easeOut(t);
const progress = Easing.easeInOut(t);
const progress = Easing.easeOutBack(t); // With overshoot
const progress = Easing.elastic(t);
const progress = Easing.bounce(t);
```

### Animation Helpers

#### `fadeAnimation`
```typescript
const opacity = fadeAnimation(frame, startFrame, TIMING.NORMAL);
```

#### `slideAnimation`
```typescript
const { x, y } = slideAnimation(frame, startFrame, 50, TIMING.NORMAL, 0, "up");
```

#### `scaleAnimation`
```typescript
const scale = scaleAnimation(frame, startFrame, 0.95, 1, TIMING.NORMAL);
```

#### `rotateAnimation`
```typescript
const rotation = rotateAnimation(frame, startFrame, 0, 360, TIMING.SLOW);
```

#### `pulseAnimation`
```typescript
const scale = pulseAnimation(frame, startFrame, 30, 0.8, 1);
```

#### `drawPathAnimation`
```typescript
const offset = drawPathAnimation(frame, startFrame, pathLength, TIMING.SLOW);
```

#### `countAnimation`
```typescript
const displayValue = countAnimation(frame, startFrame, 0, 100, TIMING.NORMAL, 0, 2);
// "0.00" to "100.00"
```

#### `waveAnimation`
```typescript
const yOffset = waveAnimation(frame, startFrame, itemIndex, totalItems, 60, 20);
```

#### `typewriterAnimation`
```typescript
const visibleChars = typewriterAnimation(frame, startFrame, text.length, TIMING.SLOW);
```

#### `sequentialReveal`
```typescript
const opacity = sequentialReveal(frame, startFrame, itemIndex, TIMING.STAGGER_NORMAL);
```

#### `springAnimation`
```typescript
const progress = springAnimation(frame, startFrame, TIMING.NORMAL, 0, 170, 26);
```

#### `loopAnimation`
```typescript
const progress = loopAnimation(frame, startFrame, TIMING.SLOW);
// Returns 0-1, repeating
```

### Utility Functions

#### `getStaggeredFrame`
```typescript
const itemStartFrame = getStaggeredFrame(baseFrame, itemIndex, TIMING.STAGGER_NORMAL);
```

#### `isVisible`
```typescript
if (isVisible(frame, startFrame, endFrame)) {
  // Show element
}
```

---

## Timing Constants

All timing values are defined in `src/lib/timing.ts`:

```typescript
import { TIMING } from "@/lib/timing";

// Duration presets (in frames at 30fps)
TIMING.INSTANT    // 5 frames (~0.16s)
TIMING.QUICK      // 15 frames (0.5s)
TIMING.NORMAL     // 30 frames (1s)
TIMING.SLOW       // 60 frames (2s)
TIMING.VERY_SLOW  // 90 frames (3s)

// Code reveal
TIMING.LINE_DELAY // 10 frames (0.33s) - delay between code lines

// Stagger delays
TIMING.STAGGER_SHORT   // 5 frames
TIMING.STAGGER_NORMAL  // 10 frames
TIMING.STAGGER_LONG    // 20 frames

// Easing curves
TIMING.EASE_OUT        // [0.16, 1, 0.3, 1]
TIMING.EASE_IN_OUT     // [0.65, 0, 0.35, 1]
TIMING.EASE_IN         // [0.42, 0, 1, 1]

// Utilities
secondsToFrames(2)  // 60
framesToSeconds(90) // 3
```

---

## Theme Colors

All components use CSS variables defined in `src/index.css`. **Never hardcode colors.**

```typescript
import { colors, getChartColor } from "@/theme/colors";

// Use in JSX
<div className="bg-primary text-primary-foreground" />
<div className="bg-muted border-border" />

// For inline styles
<div style={{ backgroundColor: colors.primary }} />

// Chart colors
const barColor = getChartColor(1); // hsl(var(--chart-1))
```

**Available Colors:**
- `background`, `foreground`
- `card`, `cardForeground`
- `primary`, `primaryForeground`
- `secondary`, `secondaryForeground`
- `muted`, `mutedForeground`
- `accent`, `accentForeground`
- `destructive`, `destructiveForeground`
- `border`, `input`, `ring`
- `chart1` through `chart5`

---

## Usage Examples

### Example 1: Code Reveal with Math

```tsx
import { Title, CodeBlock, MathFormula } from "@/components/text";
import { TIMING } from "@/lib/timing";

export const AttentionExample = () => (
  <AbsoluteFill className="bg-background p-12">
    <Title
      text="How Attention Works"
      variant="main"
      startFrame={0}
    />

    <CodeBlock
      code={`scores = Q @ K.T / sqrt(d_k)
weights = softmax(scores)
output = weights @ V`}
      language="python"
      startFrame={60}
      highlightLines={[1]}
    />

    <MathFormula
      latex="\text{scores} = \frac{Q \cdot K^T}{\sqrt{d_k}}"
      startFrame={150}
    />
  </AbsoluteFill>
);
```

### Example 2: Chat Conversation

```tsx
import { ChatBubble } from "@/components/chat";

export const ConversationExample = () => (
  <AbsoluteFill className="bg-background p-12">
    <div className="space-y-4 max-w-2xl mx-auto">
      <ChatBubble
        role="user"
        message="What's the weather in Tokyo?"
        startFrame={0}
      />
      <ChatBubble
        role="assistant"
        message="I don't have access to current weather data, but I can help you find it."
        startFrame={30}
      />
    </div>
  </AbsoluteFill>
);
```

### Example 3: ReAct Agent Loop

```tsx
import { ThoughtActionObservation } from "@/components/chat";
import { TIMING } from "@/lib/timing";

export const AgentExample = () => {
  const steps = [
    { type: "thought", content: "I need to calculate the average." },
    { type: "action", content: 'calculate("(18 + 16 + 14) / 3")' },
    { type: "observation", content: "16" },
  ];

  return (
    <AbsoluteFill className="bg-background p-12">
      <div className="space-y-3 max-w-3xl mx-auto">
        {steps.map((step, i) => (
          <ThoughtActionObservation
            key={i}
            type={step.type}
            content={step.content}
            startFrame={i * TIMING.SLOW}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
```

---

## Best Practices

### 1. Frame Timing
- Start animations at predictable frames (multiples of 30 for second markers)
- Use `TIMING` constants for consistency
- Leave buffer frames between sections (30-60 frames)

### 2. Animation Stacking
```tsx
// ✅ Good - sequential animations
<Title startFrame={0} />
<CodeBlock startFrame={60} />  // After title completes
<MathFormula startFrame={180} /> // After code completes

// ❌ Bad - overlapping animations
<Title startFrame={0} />
<CodeBlock startFrame={10} />  // Too soon, competes with title
```

### 3. Theme Usage
```tsx
// ✅ Good - using theme
<div className="bg-primary text-primary-foreground border-border" />

// ❌ Bad - hardcoded colors
<div className="bg-blue-500 text-white border-gray-300" />
```

### 4. Code Line Delays
```tsx
// For short code (3-5 lines)
<CodeBlock lineDelay={10} />  // 0.33s between lines

// For long code (10+ lines)
<CodeBlock lineDelay={5} />   // 0.16s between lines (faster)
```

---

## Component Checklist

**Phase 1: ✅ Complete**
- ✅ Animation primitives (FadeIn, SlideIn, ScaleIn, SequentialReveal, Highlight)
- ✅ Title with animations
- ✅ CodeBlock with line-by-line reveal
- ✅ MathFormula with KaTeX
- ✅ Image with overlays
- ✅ ChatBubble (user/assistant/system)
- ✅ ThoughtActionObservation (ReAct format)
- ✅ ChatComparison (RLHF)

**Phase 2: ✅ Complete**
- ✅ Layout components (VideoCard, SplitView, Section, Grid)
- ✅ Data visualization (BarChart, LineChart, HeatMap, ProgressBar)
- ✅ Diagram components (FlowDiagram, Timeline, WorkflowNode)
- ✅ Specialized (AttentionVisualization, ContextWindow, FunctionCallFlow, AnimatedBeam)

**Phase 3: ✅ Complete**
- ✅ AnimatedBeam component for flowing beam animations
- ✅ Animation utility functions (easing, helpers, patterns)

---

## Testing

Run the ComponentShowcase composition to see all components in action:

```bash
npm run dev
```

Then select "ComponentShowcase" from the sidebar in the Remotion Studio.

---

## Troubleshooting

### Images not loading
- Ensure you're using `<Img />` from Remotion, not `<img />`
- Images must be publicly accessible or in the `public/` folder

### Code syntax highlighting not working
- Verify language name is correct (use lowercase: "python", not "Python")
- Check that Shiki supports the language

### Animations not syncing
- Verify `startFrame` values are correct
- Check that `useCurrentFrame()` is being called
- Ensure components are inside a Remotion `<Composition>`

### Theme colors not applying
- Import CSS: `import "@/index.css"` in Root.tsx
- Use `className` with theme variables, not inline styles
- Check Tailwind config includes component paths

---

## Contributing

When adding new components:
1. Follow the established pattern (Props interface, animation support, theme colors)
2. Add to appropriate category folder
3. Export from category `index.ts`
4. Document in this README
5. Add example to ComponentShowcase

---

## Resources

- [Remotion Docs](https://remotion.dev/docs)
- [Shiki Language Support](https://shiki.style/languages)
- [KaTeX Supported Functions](https://katex.org/docs/supported.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
