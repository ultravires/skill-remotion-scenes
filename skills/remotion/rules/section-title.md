---
name: section-title
description: Chapter / section title card with number, title, description, and motion accents.
metadata:
  tags: section, chapter, title, transition, typography
---

# Section title (章节标题)

Full-screen transition card: optional **section number** (mono + large watermark), **title** (slide-in), **description** (fade-in), **left accent bar** (vertical scale), and a **bottom progress strip** (partial fill). Place it in a `Series.Sequence` between longer scenes.

## When to use

- Introduce the next topic in a multi-part video (install → demo → advanced).
- Replace a plain text slide with a branded title card using the tokens below.

## Design tokens

Use the same palette and scale as the rest of the video for consistency:

```ts
export const COLORS = {
  background: '#020617',
  backgroundElevated: '#0f172a',
  primary: '#3b82f6',
  text: '#ffffff',
  textSecondary: '#94a3b8',
};

export const FONTS = {
  display: '"Inter", system-ui, -apple-system, sans-serif',
  text: '"Inter", system-ui, -apple-system, sans-serif',
  mono: 'Menlo, Monaco, "Courier New", monospace',
};

export const SIZES = {
  h1: 120,
  h4: 48,
  spacing: {
    sm: 24,
    md: 48,
  },
};
```

## Full component

```tsx
import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, Easing } from 'remotion';
import { COLORS, FONTS, SIZES } from './tokens';

interface SectionTitleProps {
  title: string;
  sectionNumber?: number;
  description?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  sectionNumber,
  description,
}) => {
  const frame = useCurrentFrame();

  const numberProgress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  const titleX = interpolate(frame, [8, 28], [-60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const descOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const barScale = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 200,
        paddingRight: 200,
      }}
    >
      {sectionNumber && (
        <div
          style={{
            position: 'absolute',
            right: 100,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 400,
            fontWeight: 700,
            color: COLORS.backgroundElevated,
            fontFamily: FONTS.display,
            opacity: 0.5,
            lineHeight: 1,
            pointerEvents: 'none',
          }}
        >
          {sectionNumber.toString().padStart(2, '0')}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          left: 120,
          top: '50%',
          width: 4,
          height: 120,
          backgroundColor: COLORS.primary,
          transform: `translateY(-50%) scaleY(${barScale})`,
          borderRadius: 2,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {sectionNumber && (
          <div
            style={{
              fontSize: SIZES.h4,
              color: COLORS.primary,
              fontFamily: FONTS.mono,
              fontWeight: 500,
              marginBottom: SIZES.spacing.sm,
              opacity: numberProgress,
              transform: `translateX(${(1 - numberProgress) * -20}px)`,
              letterSpacing: '2px',
            }}
          >
            {String(sectionNumber).padStart(2, '0')}
          </div>
        )}

        <h2
          style={{
            fontSize: SIZES.h1,
            fontWeight: 700,
            color: COLORS.text,
            fontFamily: FONTS.display,
            letterSpacing: '-1px',
            lineHeight: 1.2,
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
            marginBottom: description ? SIZES.spacing.md : 0,
            margin: 0,
          }}
        >
          {title}
        </h2>

        {description && (
          <p
            style={{
              fontSize: SIZES.h4,
              color: COLORS.textSecondary,
              fontFamily: FONTS.text,
              lineHeight: 1.6,
              maxWidth: 800,
              opacity: descOpacity,
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 120,
          right: 120,
          height: 2,
          backgroundColor: COLORS.backgroundElevated,
          borderRadius: 1,
        }}
      >
        <div
          style={{
            width: '20%',
            height: '100%',
            backgroundColor: COLORS.primary,
            borderRadius: 1,
            opacity: interpolate(frame, [30, 50], [0, 1], {
              extrapolateLeft: 'clamp',
            }),
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
```

## Timing (frames)

All ranges use `extrapolateLeft/Right: 'clamp'` unless noted.

| Element | Frames | Effect |
|--------|--------|--------|
| Accent bar | 5 → 25 | `scaleY` 0 → 1, `Easing.out(Easing.exp)` |
| Section number (small) | 0 → 20 | opacity + `translateX` from -20px |
| Title | 8 → 28 | opacity + `translateX` from -60 → 0, cubic out |
| Description | 15 → 35 | opacity 0 → 1 |
| Bottom bar fill | 30 → 50 | primary segment opacity 0 → 1 |

## Composition usage

Example **90 frames @ 30fps** (~3s):

```tsx
import { Series } from 'remotion';
import { SectionTitle } from './SectionTitle';

<Series.Sequence durationInFrames={90}>
  <SectionTitle
    title="如何安装技能？"
    sectionNumber={1}
    description="一行命令快速完成安装"
  />
</Series.Sequence>
```

`sectionNumber` and `description` are optional.

## Layout summary

- Content: `AbsoluteFill`, centered column, horizontal padding **200px**, `COLORS.background`.
- **Watermark**: giant section number on the right (`fontSize: 400`, `COLORS.backgroundElevated`, opacity 0.5).
- **Left bar**: `left: 120`, `width: 4`, `height: 120`, `COLORS.primary`, `translateY(-50%) scaleY(barScale)`.
- **Bottom track**: `left/right: 120`, `bottom: 80`, track + 20% width primary fill.
