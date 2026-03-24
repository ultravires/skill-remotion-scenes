---
name: code-editor
description: Syntax-highlighted code typing demo with optional auto-scroll (IDE-style window).
metadata:
  tags: code, editor, highlight, typewriter, demo
---

# Code demo (代码演示)

Multi-line source inside a **window chrome** (traffic lights + title bar), with **frame-driven character reveal**, **highlight.js** HTML, and **vertical scroll** when the file exceeds the visible line count.

## Dependencies

- `react`, `remotion`
- `highlight.js` (e.g. `npm install highlight.js`)

## When to use

- Demo APIs, config snippets, or Remotion patterns while code “types” on screen.
- Long files: after typing completes, the viewport **scrolls** so the tail is visible.

## Tokens (subset)

```ts
export const COLORS = {
  background: '#020617',
  primary: '#3b82f6',
};

export const FONTS = {
  mono: 'Menlo, Monaco, "Courier New", monospace',
};
```

## Highlight.js theme (CSS string)

Atom One Dark–style; inject next to the editor body.

```ts
export const HljsTheme = `
  .hljs {
    color: #abb2bf;
    background: #282c34;
  }
  .hljs-comment, .hljs-quote {
    color: #5c6370;
    font-style: italic;
  }
  .hljs-doctag, .hljs-keyword, .hljs-formula {
    color: #c678dd;
  }
  .hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion, .hljs-subst {
    color: #e06c75;
  }
  .hljs-literal {
    color: #56b6c2;
  }
  .hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string {
    color: #98c379;
  }
  .hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-tag, .hljs-number {
    color: #d19a66;
  }
  .hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title {
    color: #61afef;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
  .hljs-link {
    text-decoration: underline;
  }
`;
```

## Window chrome

```tsx
import React from 'react';

export type TerminalHeaderProps = {
  title?: React.ReactNode;
};

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({ title }) => (
  <div
    style={{
      height: 40,
      backgroundColor: '#333',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      display: 'flex',
      alignItems: 'center',
      padding: '0 15px',
    }}
  >
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
    </div>
    <div
      style={{
        flex: 1,
        textAlign: 'center',
        color: '#999',
        fontSize: 14,
        fontFamily: 'monospace',
      }}
    >
      {title}
    </div>
  </div>
);

export type TerminalWindowProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
};

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  children,
  title = 'demo.tsx',
}) => (
  <div
    style={{
      width: '100%',
      maxWidth: 1600,
      backgroundColor: '#1e1e1e',
      borderRadius: 10,
      boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #333',
    }}
  >
    <TerminalHeader title={title} />
    <div
      style={{
        padding: '30px 40px',
        flex: 1,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 18,
        lineHeight: 1.4,
        color: '#fff',
        minHeight: 650,
        whiteSpace: 'pre',
      }}
    >
      {children}
    </div>
  </div>
);
```

## CodeEditor component

| Prop | Default | Role |
|------|---------|------|
| `code` | (required) | Full source; split by `\n` |
| `language` | `'typescript'` | `hljs.highlight` language id |
| `title` | `'index.ts'` | Window title |
| `typeSpeed` | `1` | Frames per revealed character |
| `startFrame` | `0` | `relativeFrame = max(0, frame - startFrame)` |

**Typing:** `charsToShow = floor(relativeFrame / typeSpeed)` is global; each line uses `progress = min(charsToShow, rawLine.length)` so lines **reveal in lockstep**. Clip with `width: progress + 'ch'` and `overflow: hidden`. **Done** when `relativeFrame >= maxLineLength * typeSpeed`.

**Scroll:** if `lines.length > 18`, after typing wait 30 frames, then animate `translateY` over 120 frames by `-(lines.length - 18) * 28` px (`Easing.inOut(Easing.quad)`).

```tsx
import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import hljs from 'highlight.js';
import { COLORS, FONTS } from './tokens';
import { HljsTheme } from './hljs-theme';
import { TerminalWindow } from './TerminalWindow';

interface CodeEditorProps {
  code: string;
  language?: string;
  title?: string;
  typeSpeed?: number;
  startFrame?: number;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language = 'typescript',
  title = 'index.ts',
  typeSpeed = 1,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  const lines = useMemo(() => code.split('\n'), [code]);

  const highlightedLines = useMemo(() => {
    const highlighted = hljs.highlight(code, { language }).value;
    return highlighted.split('\n');
  }, [code, language]);

  const maxLineLength = useMemo(() => Math.max(...lines.map((l) => l.length)), [lines]);
  const duration = maxLineLength * typeSpeed;
  const isFinished = relativeFrame >= duration;

  const visibleLinesCount = 18;
  const lineWeight = 28;

  let translateY = 0;
  if (lines.length > visibleLinesCount) {
    const scrollStartFrame = duration + 30;
    translateY = interpolate(
      frame,
      [scrollStartFrame, scrollStartFrame + 120],
      [0, -(lines.length - visibleLinesCount) * lineWeight],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.quad),
      }
    );
  }

  return (
    <TerminalWindow title={title}>
      <style dangerouslySetInnerHTML={{ __html: HljsTheme }} />

      <div
        style={{
          overflow: 'hidden',
          height: visibleLinesCount * lineWeight,
          position: 'relative',
          fontFamily: FONTS.mono,
          fontSize: 18,
          lineHeight: `${lineWeight}px`,
          backgroundColor: '#1e1e1e',
        }}
      >
        <div style={{ transform: `translateY(${translateY}px)` }}>
          {highlightedLines.map((hLine, i) => {
            const rawLine = lines[i] || '';
            const charsToShow = Math.floor(relativeFrame / typeSpeed);
            const progress = Math.min(charsToShow, rawLine.length);

            return (
              <div key={i} style={{ display: 'flex' }}>
                <span
                  style={{
                    width: 40,
                    display: 'inline-block',
                    color: '#555',
                    textAlign: 'right',
                    paddingRight: 20,
                    userSelect: 'none',
                  }}
                >
                  {i + 1}
                </span>
                <div
                  style={{
                    position: 'relative',
                    whiteSpace: 'pre',
                    overflow: 'hidden',
                    width: `${progress}ch`,
                  }}
                >
                  <span
                    className="hljs"
                    style={{ background: 'transparent', padding: 0 }}
                    dangerouslySetInnerHTML={{ __html: hLine }}
                  />
                  {!isFinished && progress > 0 && progress < rawLine.length && i === 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        width: 8,
                        height: 20,
                        backgroundColor: COLORS.primary,
                        opacity: Math.floor(frame / 5) % 2 === 0 ? 1 : 0,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TerminalWindow>
  );
};
```

## Scene wrapper

```tsx
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CodeEditor } from './CodeEditor';
import { COLORS } from './tokens';

const CODE = `import { useCurrentFrame, interpolate } from 'remotion';

export const MyComponent: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <div style={{ opacity }}>
      <h1>Hello Remotion</h1>
      <p>This is a code demo scene.</p>
    </div>
  );
};`;

export const EditorScene: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: COLORS.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 80,
    }}
  >
    <CodeEditor code={CODE} title="MyComponent.tsx" typeSpeed={1.5} />
  </AbsoluteFill>
);
```

## Relation to terminal scene

[terminal.md](terminal.md) covers **shell** typewriter (`$`, commands). This pattern is **IDE-style** highlighted source in the same window chrome.
