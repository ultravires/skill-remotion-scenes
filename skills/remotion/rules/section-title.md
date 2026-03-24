---
name: section-title
description: Chapter / section title card with number, title, description, and motion accents.
metadata:
  tags: section, chapter, title, transition, typography
---

# Section title (章节标题)

Full-screen transition card: optional **section number** (mono + large watermark), **title** (slide-in), **description** (fade-in), **left accent bar** (vertical scale), and a **bottom progress strip** (partial fill). Implemented as `SectionTitle` in this repo; pair with `Series.Sequence` between longer scenes.

## When to use

- Introduce the next topic in a multi-part video (install → demo → advanced).
- Replace a plain text slide with something that matches the design tokens (`COLORS`, `FONTS`, `SIZES`).

## Timing (frames)

All ranges use `extrapolateLeft/Right: 'clamp'` unless noted.

| Element | Frames | Effect |
|--------|--------|--------|
| Accent bar | 5 → 25 | `scaleY` 0 → 1, `Easing.out(Easing.exp)` |
| Section number (small) | 0 → 20 | opacity + `translateX` from -20px |
| Title | 8 → 28 | opacity + `translateX` from -60 → 0, cubic out |
| Description | 15 → 35 | opacity 0 → 1 |
| Bottom bar fill | 30 → 50 | primary segment opacity 0 → 1 |

Adjust durations to match your composition `fps` and `durationInFrames`.

## Composition usage

Typical duration in this project: **90 frames @ 30fps** (~3s).

```tsx
import { Series } from 'remotion';
import { SectionTitle } from './components/SectionTitle';

<Series.Sequence durationInFrames={90}>
  <SectionTitle
    title="如何安装技能？"
    sectionNumber={1}
    description="一行命令快速完成安装"
  />
</Series.Sequence>
```

`sectionNumber` and `description` are optional; omit them if you only need a title.

## Layout notes

- Content: `AbsoluteFill`, centered column, horizontal padding **200px**.
- **Watermark**: giant `sectionNumber` on the right (`fontSize: 400`, `COLORS.backgroundElevated`, low opacity).
- **Left bar**: fixed at `left: 120`, `width: 4`, `height: 120`, `COLORS.primary`, `transform: translateY(-50%) scaleY(barScale)`.
- **Bottom track**: full width between `left/right: 120`, subtle track + ~20% width primary fill for a “chapter progress” hint.

## Reference implementation

See `src/components/SectionTitle.tsx` for the full component (imports `COLORS`, `FONTS`, `SIZES` from `src/design-system/tokens`).
