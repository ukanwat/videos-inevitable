# Typography System

**DM Sans** (primary), **Spectral** (serif accent), **JetBrains Mono** (code)

---

## Font Stack

| Font | Usage | Character |
|------|-------|-----------|
| **DM Sans** | 70-80% - Default everywhere | Modern geometric sans-serif |
| **Spectral** | 10-20% - Quotes, citations, emphasis | Elegant screen serif |
| **JetBrains Mono** | 10% - Code only | Monospace with ligatures |

---

## Quick Reference

### Default (DM Sans)
All text uses DM Sans by default - no class needed.

### Serif Accent (Spectral)
```tsx
// Quotes
<p className="text-quote">"Elegant italic quote..."</p>

// Citations
<p className="text-citation">Vaswani et al., 2017</p>

// Generic serif
<p className="font-serif">Spectral text</p>
```

### Monospace (Code)
```tsx
<code className="font-mono">const x = 42;</code>
```

---

## Typography Hierarchy

| Element | Class | Font | Size | Weight |
|---------|-------|------|------|--------|
| Main Title | `<Title variant="main">` | DM Sans | 60px | Bold (700) |
| Section Title | `<Title variant="section">` | DM Sans | 48px | Semibold (600) |
| Inline Title | `<Title variant="inline">` | DM Sans | 24px | Medium (500) |
| Body | `text-lg` | DM Sans | 18px | Normal (400) |
| Small Text | `text-sm` | DM Sans | 14px | Normal (400) |
| Code | `font-mono` | JetBrains Mono | 14px | Normal (400) |

---

## When to Use Spectral

### ✅ USE for:
- Opening/closing quotes
- Academic citations
- Pull quotes / key insights
- "Final Answer" in ReAct loops
- Theoretical statements

### ❌ DON'T USE for:
- Regular body text
- UI labels/buttons
- Chat messages
- Most titles
- Code

---

## Custom Utility Classes

Defined in `src/index.css`:

```css
.text-quote {
  font-family: 'Spectral', Georgia, serif;
  font-style: italic;
  font-weight: 400;
  line-height: 1.6;
}

.text-citation {
  font-family: 'Spectral', Georgia, serif;
  font-weight: 300;
  font-style: italic;
}
```

---

## Examples

```tsx
// Opening quote
<p className="text-quote text-xl">
  "Each breakthrough created a new limitation..."
</p>

// Citation
<p className="text-citation text-sm">
  Vaswani, A., et al. (2017)
</p>

// Emphasis block
<blockquote className="font-serif italic border-l-4 pl-6">
  Key insight here
</blockquote>
```

---

## Best Practices

- **Default**: DM Sans for everything
- **Accent**: Spectral for 10-20% max
- **Code**: JetBrains Mono automatic in `<CodeBlock>`
- **Tracking**: Use `tracking-tight` on large DM Sans titles
- **Weights**: Bold (700) for main, Semibold (600) for sections
