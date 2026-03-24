---
name: code-editor
description: Syntax-highlighted code typing demo with optional auto-scroll (IDE-style window).
metadata:
  tags: code, editor, highlight, typewriter, demo
---

# Code demo (代码演示)

Shows **multi-line source** inside a **window chrome** (`TerminalWindow` + header), with **character-at-a-time reveal** driven by `useCurrentFrame`, **highlight.js** HTML output, and **vertical scroll** when the file exceeds the visible line budget. Scene wrapper: `EditorScene`; core UI: `CodeEditor`.

## When to use

- Demo APIs, config snippets, or Remotion patterns while code “types” on screen.
- Long files: after typing completes, the viewport **scrolls** so the tail is visible.

## Props (`CodeEditor`)

| Prop | Default | Role |
|------|---------|------|
| `code` | (required) | Full source string; split by `\n` for lines |
| `language` | `'typescript'` | Passed to `hljs.highlight` |
| `title` | `'index.ts'` | Window title (file name) |
| `typeSpeed` | `1` | Frames per **character** (higher = slower typing) |
| `startFrame` | `0` | Delay typing: `relativeFrame = max(0, frame - startFrame)` |

## How typing works

1. `lines = code.split('\n')`.
2. `highlightedLines`: run `hljs.highlight(code, { language }).value`, then `split('\n')` (simple per-line split; rare cross-line HTML edge cases may look slightly off during typing).
3. **Global character index**: `charsToShow = floor(relativeFrame / typeSpeed)` is shared by every line. On each row, `progress = min(charsToShow, rawLine.length)`—so **all lines reveal in lockstep** (“同步打字”): each line grows up to the same character count until shorter lines are complete and longer ones keep going.
4. Reveal is implemented with **`width: progress + 'ch'`** + `overflow: hidden` around the highlighted HTML span.

`duration` for “typing finished” is **`maxLineLength * typeSpeed`** (longest physical line length × type speed), matching when the slowest line finishes.

## Auto-scroll

- `visibleLinesCount = 18`, `lineWeight = 28` (px line height).
- If `lines.length > visibleLinesCount`, after typing: `scrollStartFrame = duration + 30`, then `translateY` animates over **120 frames** from `0` to `-(lines.length - visibleLinesCount) * lineWeight` with `Easing.inOut(Easing.quad)`.

Tune these if you change font size or line height.

## Styling

- Injects `HljsTheme` (Atom One Dark–style CSS string) with `<style dangerouslySetInnerHTML={{ __html: HljsTheme }} />`.
- Editor body uses `#1e1e1e` to match the terminal window; line numbers in a muted `#555` gutter.

## Scene wrapper example

Center the window on `COLORS.background` with padding (as in `EditorScene`):

```tsx
import { AbsoluteFill } from 'remotion';
import { CodeEditor } from './components/Terminal/CodeEditor';
import { COLORS } from './design-system/tokens';

const CODE = `export const Example = () => <div>Hello</div>;`;

export const EditorScene: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: COLORS.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 80,
    }}
  >
    <CodeEditor code={CODE} title="Example.tsx" typeSpeed={1.5} />
  </AbsoluteFill>
);
```

## Reference files

- `src/components/Terminal/CodeEditor.tsx` — typing, scroll, gutter, cursor blink on first line while typing.
- `src/EditorScene.tsx` — sample `CODE` string and scene layout.
- `src/design-system/hljs-theme.ts` — highlight.js class colors.

## Relation to terminal scene

[terminal.md](terminal.md) covers **shell** typewriter (`$`, commands). This rule covers **IDE-style** multi-line **highlighted** code in the same window chrome—reuse `TerminalWindow` / header patterns for visual consistency.
