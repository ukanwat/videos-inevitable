# Adding New Videos

This guide explains how to add new videos to the project using the established structure.

---

## Quick Start

```bash
# 1. Create new video directory
mkdir -p src/videos/02-my-new-video/{docs,components,compositions,data}

# 2. Copy metadata template
cp src/videos/01-agents-inevitable/metadata.ts src/videos/02-my-new-video/

# 3. Create your script
touch src/videos/02-my-new-video/docs/SCRIPT.md
```

---

## Video Directory Structure

Each video follows this structure:

```
src/videos/XX-video-slug/
├── docs/
│   ├── SCRIPT.md           # Full narrative script with timestamps
│   └── SOUND_EFFECTS.md    # Sound effects mapping (optional)
├── components/             # Video-specific components
│   ├── MyCustomComponent.tsx
│   └── index.ts           # Barrel export
├── compositions/           # Video sections/scenes
│   ├── MainVideo.tsx      # Main composition
│   ├── Opening.tsx
│   ├── Section1.tsx
│   └── index.ts           # Barrel export
├── data/                   # Video-specific data/constants
│   └── examples.ts
└── metadata.ts            # Video metadata (title, duration, fps, etc.)
```

---

## Step-by-Step Guide

### 1. Create Video Directory

Choose a number and descriptive slug:
```bash
mkdir -p src/videos/02-my-video-title/{docs,components,compositions,data}
```

### 2. Create metadata.ts

```typescript
// src/videos/02-my-video-title/metadata.ts
export const videoMetadata = {
  id: 'my-video-slug',
  title: 'My Video Title',
  description: 'Brief description of the video',
  duration: 420, // Duration in seconds (7:00)
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 12600, // duration * fps
  sections: [
    { name: 'Opening', startFrame: 0, endFrame: 300 },
    { name: 'Section 1', startFrame: 300, endFrame: 900 },
    // ... add all sections
  ],
};
```

### 3. Write Your Script

Create `docs/SCRIPT.md` with your narrative, timestamps, and visual notes.

See `src/videos/01-agents-inevitable/docs/SCRIPT.md` for format reference.

### 4. Build Compositions

Create section components in `compositions/`:

```typescript
// compositions/Section1.tsx
import { AbsoluteFill } from "remotion";
import { Title } from "@/components/text";

export const Section1: React.FC = () => {
  return (
    <AbsoluteFill className="bg-background">
      <Title text="Section 1" variant="main" startFrame={0} />
      {/* Your content */}
    </AbsoluteFill>
  );
};
```

### 5. Create MainVideo Composition

```typescript
// compositions/MainVideo.tsx
import { AbsoluteFill, Sequence } from "remotion";
import { Section1 } from "./Section1";
// ... other imports

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill className="bg-background">
      <Sequence from={0} durationInFrames={300}>
        <Section1 />
      </Sequence>
      {/* Add more sequences */}
    </AbsoluteFill>
  );
};
```

### 6. Create Barrel Exports

**compositions/index.ts:**
```typescript
export { MainVideo } from './MainVideo';
export { Section1 } from './Section1';
// ... export all compositions
```

**components/index.ts** (if you have video-specific components):
```typescript
export { MyCustomComponent } from './MyCustomComponent';
// ... export all components
```

### 7. Register Video

Add to `src/videos/index.ts`:
```typescript
export { MainVideo as MyVideoTitle } from './02-my-video-title/compositions';
export { videoMetadata as myVideoMetadata } from './02-my-video-title/metadata';
```

### 8. Update Root.tsx

Add your video to the Remotion root:
```typescript
import { MyVideoTitle, myVideoMetadata } from './videos';

<Composition
  id={myVideoMetadata.id}
  component={MyVideoTitle}
  durationInFrames={myVideoMetadata.durationInFrames}
  fps={myVideoMetadata.fps}
  width={myVideoMetadata.width}
  height={myVideoMetadata.height}
/>
```

---

## Component Guidelines

### Shared vs. Video-Specific

**Use Shared Components** (`src/components/`) for:
- Generic animations (FadeIn, SlideIn)
- Standard UI (Title, CodeBlock, VideoCard)
- Reusable visualizations (BarChart, LineChart)
- Common diagrams

**Create Video-Specific Components** (`src/videos/XX-name/components/`) for:
- Custom visualizations for this video's narrative
- Highly specialized components
- Components that might not be reused

**Import Patterns:**
```typescript
// Shared components (from anywhere)
import { Title } from '@/components/text';
import { FadeIn } from '@/components/animation';

// Video-specific components (from within video)
import { MyCustomComponent } from '../components';
```

---

## Sound Effects

### Using Shared Sound Effects

All shared sound effects are in `public/audio/`:
- `error_buzz.mp3`
- `success_ding.mp3`
- `notification_pop.mp3`
- `swoosh_cinematic.mp3`

Usage:
```typescript
import { SoundEffect } from '@/components/audio';

<SoundEffect type="success" startFrame={420} />
<SoundEffect type="notification" startFrame={600} volume={0.2} />
```

### Adding Video-Specific Sounds

If you need custom sound effects:
1. Add them to `public/audio/`
2. Update `SoundEffect` component types if needed
3. Document in `docs/SOUND_EFFECTS.md`

---

## Testing Your Video

```bash
# Start Remotion Studio
npm run dev

# Your video should appear in the sidebar
# Select it and verify:
# - All sections render
# - Animations work correctly
# - Sound effects play at right times
# - No import errors
```

---

## Best Practices

1. **Follow Layout Conventions**: See `docs/LAYOUT_CONVENTIONS.md` for 1920×1080 canvas guidelines
2. **Use Theme Colors**: Never hardcode colors, use CSS variables
3. **Frame Timing**: Use `TIMING` constants for consistency
4. **Documentation**: Write clear scripts with visual notes
5. **Reusability**: Extract reusable components to shared library
6. **Performance**: Test render time, optimize heavy animations

---

## Example: Complete New Video

See `src/videos/01-agents-inevitable/` as the reference implementation.

All patterns and structures follow this example.

---

## Need Help?

- Layout guidelines: `docs/LAYOUT_CONVENTIONS.md`
- Component library: `docs/COMPONENTS.md`
- Typography system: `docs/TYPOGRAPHY.md`
- Tech stack details: `docs/TECH_STACK.md`
