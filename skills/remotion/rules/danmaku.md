---
name: danmaku
description: Danmaku / bullet screen / 弹幕 scene implementation in Remotion
metadata:
  tags: danmu, 弹幕, bullet, danmaku
---

# Danmaku (bullet screen) in Remotion

Create dynamic, controllable bullet screen (danmaku) animations for videos using Remotion.

## Features

- Customizable text messages, colors, and fonts
- Deterministic random generation for consistent rendering
- Smooth horizontal scrolling animation
- Full control over timing, position, and duration
- Configurable quantity and visual styles

## Random Colors

Give some colors.

```tsx
const COLORS = [
  "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"
];

// Helper to generate deterministic but random-ish values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};
```

## Render danmaku item

```tsx
const DanmakuItem: React.FC<{
  text: string;
  top: number;
  startFrame: number;
  duration: number;
  color: string;
  fontSize: number;
}> = ({ text, top, startFrame, duration, color, fontSize }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0 || relativeFrame > duration) {
    return null;
  }

  // Animate from right (width) to left (-estimated text width)
  const left = interpolate(
    relativeFrame,
    [0, duration],
    [width, -text.length * fontSize],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}px`,
        color,
        fontSize: `${fontSize}px`,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      }}
    >
      {text}
    </div>
  );
};
```