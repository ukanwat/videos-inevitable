# Video Layout Conventions

**For creating new video sections that look good on the 1920x1080 canvas**

---

## Understanding Video Layout

### This is VIDEO, not a website

**Key differences:**
- **Fixed canvas:** Everything must fit in 1920×1080 pixels. No scrolling.
- **No responsive behavior:** The canvas is always the same size
- **Everything is visible at once:** Can't hide overflow or paginate
- **Static presentation:** Content doesn't reflow based on screen size

**What looks awkward in video:**
- Tiny component floating in the center (like a 300px card in the middle of 1920px)
- Content overflowing vertically (can't scroll to see it)
- Unbalanced spacing (huge gaps on one side, cramped on the other)
- Text that's too small to read comfortably

---

## Canvas Specifications

- **Dimensions:** 1920×1080 (Full HD)
- **Aspect Ratio:** 16:9
- **Standard padding:** Most sections use `p-12` (48px) or `p-16` (64px) around edges
- **Safe content area:** After padding, you have roughly 1800×1000 pixels to work with

---

## Component Sizing Patterns

### When Components Look Too Small

**Problem:** A 400px card centered on a 1920px canvas looks lost and awkward.

**Solution:** Use `max-w-*` classes to constrain width appropriately:

```tsx
// ❌ Too small - looks lost
<div className="w-96 mx-auto">
  <CodeBlock />
</div>

// ✅ Good - feels substantial
<div className="max-w-4xl mx-auto">
  <CodeBlock />
</div>
```

### Component Width Guidelines

Use Tailwind max-width classes based on content importance:

| Content Type | Max Width | Tailwind Class | When to Use |
|--------------|-----------|----------------|-------------|
| Small/focused | 672px | `max-w-xl` | Single small visualization, compact form |
| Medium content | 768px | `max-w-2xl` | Single chat example, small code block |
| Standard content | 896px | `max-w-3xl` | Readable text blocks, medium visualizations |
| Main content | 1024px | `max-w-4xl` | Most code blocks, primary content |
| Large content | 1152px | `max-w-5xl` | Complex visualizations, wide layouts |
| Extra large | 1280px | `max-w-6xl` | Full-featured components, rich layouts |
| Full width | - | (no constraint) | Split views, grids, hero sections |

**Let components be flexible:** These are `max-width` values - content can be smaller and will wrap naturally.

### Current Patterns from Codebase

```tsx
// Section1Attention - Math formulas and explanations
<div className="flex flex-col items-center justify-center flex-1 max-w-5xl mx-auto">

// Section2RLHF - Chat comparison
<div className="absolute inset-0 p-12 flex flex-col items-center justify-center">

// Section5Agents - ReAct loop
<div className="w-full max-w-4xl mx-auto space-y-6">
```

---

## Standard Padding & Spacing

### Section-level Padding

Most sections use consistent outer padding:

```tsx
// Standard pattern
<AbsoluteFill className="bg-background p-12">  // 48px padding
<AbsoluteFill className="bg-background p-16">  // 64px padding

// For dense content
<AbsoluteFill className="bg-background p-8">   // 32px padding
```

### Spacing Between Elements

Use Tailwind spacing scale consistently:

| Space | Class | Pixels | When to Use |
|-------|-------|--------|-------------|
| Tight | `gap-2`, `space-y-2` | 8px | List items, tightly grouped content |
| Normal | `gap-4`, `space-y-4` | 16px | Related elements, card grids |
| Medium | `gap-6`, `space-y-6` | 24px | Section spacing, comfortable separation |
| Large | `gap-8`, `space-y-8` | 32px | Major section divisions |
| Extra large | `gap-12`, `space-y-12` | 48px | Between distinct content blocks |
| Huge | `mb-16`, `mt-16` | 64px | Title to content separation |

**Keep it dynamic:** Use `space-y-*` and `gap-*` for flexibility rather than fixed margins.

---

## Layout Patterns

### 1. Centered Single Component

**When:** Main focus is one visualization or code block

```tsx
// Pattern from Section3FunctionCalling
<div className="flex items-center justify-center h-full">
  <CodeBlock code={functionSchema} language="json" />
</div>
```

**Tips:**
- Use `max-w-4xl` or similar to prevent tiny-in-center
- Add `mx-auto` for horizontal centering
- Use flexbox for vertical centering

### 2. Title + Content Layout

**When:** Section has a clear title and main content area

```tsx
// Pattern from Section1Attention
<div className="absolute inset-16 flex flex-col">
  {/* Title area */}
  <div className="w-full mb-16">
    <Title text="Section Title" variant="main" />
  </div>

  {/* Main content - flex-1 takes remaining space */}
  <div className="flex-1 flex items-center justify-center">
    <AttentionVisualization />
  </div>
</div>
```

**Vertical Space Budget:**
- Title area: ~100-120px
- Gap: 48-64px (`mb-12` to `mb-16`)
- Content: remaining space (700-850px typically)

### 3. Split View Layout

**When:** Comparing two things side-by-side (Before/After, A vs B)

```tsx
// Pattern from Section2RLHF
<SplitView
  left={<BeforeContent />}
  right={<AfterContent />}
  startFrame={60}
/>

// Or manual grid
<div className="grid grid-cols-2 gap-12">
  <div>{leftContent}</div>
  <div>{rightContent}</div>
</div>
```

**Tips:**
- Each side gets roughly 860-900px width (after padding and gap)
- Use `gap-6` (24px) to `gap-12` (48px) between sides
- Keep both sides balanced in content amount

### 4. Grid Layouts

**When:** Multiple related items (cards, examples, options)

```tsx
// 2-column (each ~880px)
<Grid columns={2} gap={6} stagger>
  {items.map(item => <VideoCard>{item}</VideoCard>)}
</Grid>

// 3-column (each ~560px)
<Grid columns={3} gap={4} stagger>
  {items.map(item => <VideoCard>{item}</VideoCard>)}
</Grid>
```

**Column Guidelines:**
- 2 columns: Each gets ~45% width, good for substantial content
- 3 columns: Each gets ~30% width, good for smaller cards/options
- 4 columns: Each gets ~22% width, only for very compact items

### 5. Stacked Content

**When:** Multiple sequential elements (chat messages, TAO steps, timeline)

```tsx
// Pattern from Section5Agents
<div className="space-y-8">
  {iterations.map((iteration, i) => (
    <IterationComponent key={i} {...iteration} />
  ))}
</div>
```

**Tips:**
- Use `space-y-*` for consistent vertical rhythm
- Start with `space-y-6` (24px), adjust based on content density
- For chat/TAO: `space-y-3` or `space-y-4`
- For major sections: `space-y-8` or `space-y-12`

---

## Typography Guidelines

### Title Hierarchy

```tsx
// Main section titles (appears once per section)
<Title variant="main" text="The Foundation" />
// → text-4xl/5xl (48-60px), bold, takes ~100-120px vertical space

// Subsection titles
<Title variant="section" text="How it Works" />
// → text-3xl/4xl (36-48px), semibold, takes ~80-100px vertical space

// Inline titles (within content)
<Title variant="inline" text="Step 1" />
// → text-xl/2xl (20-24px), medium weight
```

### Body Text Sizing

**For video readability, err on the larger side:**

```tsx
// Standard body text
<p className="text-lg">...</p>        // 18px - good for most content
<p className="text-xl">...</p>        // 20px - for important callouts

// Smaller text
<p className="text-base">...</p>      // 16px - minimum for readability
<p className="text-sm">...</p>        // 14px - only for captions/labels

// Code blocks
<CodeBlock />                          // Uses text-sm (14px) by default
```

**Line Length for Readability:**
- Body text: `max-w-3xl` (768px) to `max-w-4xl` (1024px)
- Quotes/callouts: `max-w-2xl` (672px) to `max-w-3xl` (768px)
- Don't let text span full 1920px width - it's unreadable

---

## Vertical Space Management

### Checking if Content Fits

**Total available height:** ~1080px

**Typical breakdown:**
```
Top padding:        48px   (p-12)
Title:             100px   (text-5xl + margins)
Title-to-content:   64px   (mb-16)
Main content:      750px   (flex-1 or calculated)
Bottom padding:     48px   (p-12)
Footer/caption:     70px   (if present)
─────────────────────────
Total:            1080px
```

### When Content Doesn't Fit

**Option 1: Reduce sizes**
```tsx
// Reduce title size
variant="section" instead of variant="main"

// Tighten spacing
mb-8 instead of mb-16

// Reduce padding
p-8 instead of p-12
```

**Option 2: Split into multiple scenes**
```tsx
// Instead of showing all 10 items at once
{frame < 450 && <Items1-5 />}
{frame >= 450 && <Items6-10 />}
```

**Option 3: Use scrollable area (last resort)**
```tsx
// Only if absolutely necessary - video shouldn't scroll
<div className="overflow-y-auto max-h-[800px]">
```

### When Content Feels Sparse

If you have a small component floating in lots of whitespace:

**Option 1: Scale up the component**
```tsx
// Increase max-width
max-w-2xl → max-w-4xl
```

**Option 2: Add supporting elements**
```tsx
// Add context, captions, or decorative elements
<div>
  <Component />
  <p className="mt-6 text-center text-muted-foreground">Caption explaining...</p>
</div>
```

**Option 3: Adjust section padding**
```tsx
// Use less padding to make content feel more substantial
p-16 → p-8
```

---

## Common Issues & Solutions

### Issue: Tiny Component in Center

```tsx
// ❌ Problem: 300px card looks lost on 1920px canvas
<div className="w-[300px] mx-auto">
  <Card>Content</Card>
</div>

// ✅ Solution: Use appropriate max-width
<div className="max-w-2xl mx-auto">
  <Card>Content</Card>
</div>
```

### Issue: Content Overflowing Vertically

```tsx
// ❌ Problem: 1200px content + padding = overflow
<div className="h-screen p-12">
  <TallComponent height={1200} />
</div>

// ✅ Solution: Check vertical budget or split scenes
{frame < 600 && <Part1 />}
{frame >= 600 && <Part2 />}
```

### Issue: Uneven Spacing

```tsx
// ❌ Problem: Random margin values
<div className="mt-7 mb-11 ml-9">

// ✅ Solution: Use standard spacing scale
<div className="mt-8 mb-12 ml-8">
// Or even better:
<div className="space-y-8 px-8">
```

### Issue: Text Too Small to Read

```tsx
// ❌ Problem: Small text in video
<p className="text-xs">Important information</p>

// ✅ Solution: Use larger text for video
<p className="text-base">Important information</p>
```

### Issue: Awkward Split View

```tsx
// ❌ Problem: Manual widths that don't account for gap
<div className="flex">
  <div className="w-[960px]">Left</div>
  <div className="w-[960px]">Right</div>
</div>

// ✅ Solution: Use grid for automatic balancing
<div className="grid grid-cols-2 gap-6">
  <div>Left</div>
  <div>Right</div>
</div>
```

---

## Examples from Existing Code

### Good Example: Section1Attention Q,K,V Display

```tsx
<div className="flex flex-col items-center justify-center flex-1 max-w-5xl mx-auto">
  {/* 3-column grid for Q, K, V */}
  <div className="grid grid-cols-3 gap-6 mb-12">
    {[Q, K, V].map(item => (
      <div className="bg-card border rounded-lg p-4">
        {item}
      </div>
    ))}
  </div>

  {/* Formulas with consistent spacing */}
  <div className="space-y-6 w-full">
    <MathFormula latex="..." />
    <MathFormula latex="..." />
    <MathFormula latex="..." />
  </div>
</div>
```

**Why it works:**
- `max-w-5xl` prevents content from being too wide
- `grid-cols-3 gap-6` evenly spaces the three items
- `space-y-6` creates consistent vertical rhythm
- `mx-auto` centers the entire block

### Good Example: Section5Agents ReAct Loop

```tsx
<div className="w-full max-w-4xl mx-auto space-y-6">
  {iterations.map((iteration, index) => (
    <div key={index}>
      {/* Iteration with consistent spacing */}
      <div className="space-y-2 border-l-2 pl-4">
        <ThoughtActionObservation type="thought" />
        <ThoughtActionObservation type="action" />
        <ThoughtActionObservation type="observation" />
      </div>
    </div>
  ))}
</div>
```

**Why it works:**
- `max-w-4xl` constrains width for readability
- `space-y-6` between iterations, `space-y-2` within iteration
- `border-l-2 pl-4` creates visual hierarchy
- Spacing is consistent and predictable

### Good Example: Section2RLHF Before/After

```tsx
<SplitView
  left={<BeforeExample />}
  right={<AfterExample />}
  leftLabel="Before RLHF"
  rightLabel="After RLHF"
  startFrame={60}
/>
```

**Why it works:**
- Built-in component handles balancing
- Each side gets equal space
- Labels provide context
- Clean, scannable layout

---

## Quick Decision Guide

### Choosing Component Width

**Ask: How important is this content to the current scene?**

- **Hero/primary content:** `max-w-5xl` to `max-w-6xl` (or full width)
- **Main content:** `max-w-4xl`
- **Supporting content:** `max-w-2xl` to `max-w-3xl`
- **Small focused elements:** `max-w-xl` to `max-w-2xl`

**Ask: Is it a comparison or multi-column?**
- Use grid without max-width constraint: `grid grid-cols-2` or `grid-cols-3`

### Choosing Padding

**Ask: How much content is in this section?**

- **Lots of content (dense):** `p-8` or `p-12` (more space for content)
- **Medium amount:** `p-12` or `p-16` (standard)
- **Little content (sparse):** `p-16` or `p-20` (more breathing room)

### Choosing Font Size

**Ask: Will this be readable on screen?**

- **Minimum for body text:** `text-base` (16px)
- **Standard body:** `text-lg` (18px)
- **Important content:** `text-xl` (20px)
- **Code/technical:** `text-sm` (14px) is acceptable

**Ask: How much text is there?**
- Short snippets: Can use larger sizes
- Paragraphs: Stick to `text-lg` or `text-xl`

### Choosing Vertical Spacing

**Ask: How related are these elements?**

- **Very related (list items):** `space-y-2` or `space-y-3`
- **Related (section content):** `space-y-4` or `space-y-6`
- **Separate concepts:** `space-y-8` or `space-y-12`
- **Major divisions:** `mb-16` or `mt-16`

---

## Best Practices

### ✅ Do

- Use consistent spacing (multiples of 4px/8px via Tailwind)
- Constrain width with `max-w-*` to prevent tiny-in-center
- Use flexbox centering: `flex items-center justify-center`
- Test vertical budget: title + content + padding = 1080px
- Use semantic components: `<Section>`, `<VideoCard>`, `<Grid>`
- Keep text readable: minimum `text-base` (16px)
- Let content be flexible (text wrapping, aspect ratios)

### ❌ Don't

- Use arbitrary pixel values: prefer Tailwind classes
- Make components too small (under 600px for main content)
- Overflow vertically without checking
- Mix spacing scales randomly (p-7, mt-13, etc.)
- Use responsive breakpoints (no sm:, md:, lg: - it's always 1920×1080)
- Make text too small (below 14px)
- Fight component natural sizing (let text wrap, maintain aspect ratios)

---

## Tailwind Spacing Reference

Quick lookup for common Tailwind spacing classes:

| Class | Pixels | Common Use |
|-------|--------|------------|
| `p-2`, `gap-2` | 8px | Tight spacing |
| `p-4`, `gap-4` | 16px | Normal spacing |
| `p-6`, `gap-6` | 24px | Comfortable spacing |
| `p-8`, `gap-8` | 32px | Large spacing |
| `p-12`, `gap-12` | 48px | Section padding, large gaps |
| `p-16`, `gap-16` | 64px | Extra large padding |
| `p-20`, `gap-20` | 80px | Very spacious |

---

## Summary

**Golden Rules for Video Layouts:**

1. **Canvas is 1920×1080, always** - everything must fit
2. **Prevent tiny-in-center** - use appropriate `max-w-*` classes
3. **Check vertical budget** - title + content + padding ≤ 1080px
4. **Use consistent spacing** - stick to Tailwind scale (4, 6, 8, 12, 16)
5. **Keep text readable** - minimum 16px, prefer 18px
6. **Let components be flexible** - text wraps, aspect ratios preserved
7. **Follow existing patterns** - look at working sections for reference

**When in doubt:**
- Look at existing sections that work well
- Use `max-w-4xl mx-auto` for most centered content
- Use `p-12` for section padding
- Use `space-y-6` for vertical rhythm
- Use `text-lg` for body text
