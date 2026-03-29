---
name: skill-remotion-scenes
description: >-
  Remotion / React programmatic video scenes: hero banners, section/chapter title cards,
  syntax-highlighted code demos (IDE-style typing + scroll), terminal-style typewriter UIs,
  danmaku (弹幕 / bullet comments), and render configuration. Use whenever the user works on
  Remotion compositions, create-video projects, Remotion Studio or Lambda renders,
  frame-based animation (`useCurrentFrame`, `interpolate`, `spring`), or wants UI-in-video
  patterns (title cards, fake CLI, scrolling overlay text)—not generic SPA animation alone.
  Open the matching file under rules/ for copy-pastable patterns; pair with remotion-best-practices
  for general Remotion guidance when the task is broader than these scene templates.
metadata:
  tags: remotion, video, react, animation, composition, scenes
---

## When to use

Consult this skill when the task is **Remotion-specific**: building or editing compositions, scene components, or render setup where frames and video output matter. The rule files hold focused recipes; read only the one that matches the scene you are implementing.

## Workflow

1. **New or cloned project** — Apply [rules/settings.md](rules/settings.md) so local Chrome / headless shell and `Config` match the environment, then scaffold with `create-video` if needed.
2. **Implement a scene** — Open exactly one rule below for structure, timing, and styling conventions used in this repo.

## Scaffold

```sh
npx create-video@latest
```

## Scene rules (read as needed)

| Rule | Use when |
|------|----------|
| [rules/settings.md](rules/settings.md) | `remotion.config.ts` / `@remotion/cli/config`, browser executable, consistent renders |
| [rules/hero.md](rules/hero.md) | Top banner, title + subtitle, first-impression intro |
| [rules/section-title.md](rules/section-title.md) | Chapter / section title card (number, title, description, motion) |
| [rules/code-editor.md](rules/code-editor.md) | Code demo: highlight.js + per-character reveal + auto-scroll |
| [rules/terminal.md](rules/terminal.md) | Fake terminal, typewriter command output, header bar |
| [rules/danmaku.md](rules/danmaku.md) | Horizontal bullet comments / 弹幕 over video |
| [rules/subtitles.md](rules/subtitles.md) | Subtitle / caption overlay scenes with audio timeline sync |

Do not load every rule up front—pull in the file that matches the current scene to keep context lean.
