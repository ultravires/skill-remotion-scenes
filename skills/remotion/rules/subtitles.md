---
name: subtitles
description: Subtitle / caption scene implementation in Remotion
metadata:
  tags: subtitles, captions, 字幕, voiceover
---

# Subtitles (字幕) in Remotion

为场景增加可控字幕层，支持按毫秒时间轴切换，适合配音讲解、开场白、教程解说等视频。

## When to use

- 已有配音音频（如 `public/*.wav`），需要在对应场景显示字幕
- 需要把字幕逻辑组件化，便于多个场景复用
- 希望字幕文案和时间轴分离，便于后续校对与批量替换

## Basic pattern

### 1) 定义字幕类型与组件

```tsx
// src/components/CaptionOverlay.tsx
import React from 'react';

export type SceneCaption = {
  text: string;
  startMs: number;
  endMs: number;
};

export const CaptionOverlay: React.FC<{
  frame: number;
  fps: number;
  captions: SceneCaption[];
}> = ({frame, fps, captions}) => {
  const currentMs = (frame / fps) * 1000;
  const activeCaption =
    captions.find((c) => currentMs >= c.startMs && currentMs < c.endMs) ?? null;

  if (!activeCaption) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 80,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          padding: '14px 28px',
          borderRadius: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          color: '#f8fafc',
          fontSize: 44,
          fontWeight: 500,
          lineHeight: 1.35,
          textAlign: 'center',
        }}
      >
        {activeCaption.text}
      </div>
    </div>
  );
};
```

### 2) 在场景中挂载音频和字幕

```tsx
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CaptionOverlay, type SceneCaption} from './components/CaptionOverlay';

const scene1Captions: SceneCaption[] = [
  {startMs: 0, endMs: 1200, text: '大家好，欢迎来到 skill-remotion-scenes。'},
  {startMs: 1200, endMs: 2300, text: '这里提供多种可复用的视频场景模板。'},
  {startMs: 2300, endMs: 3450, text: '一行命令安装，马上开始制作高质量视频。'},
];

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile('开场白.wav')} />
      {/* ...原有场景内容... */}
      <CaptionOverlay frame={frame} fps={fps} captions={scene1Captions} />
    </AbsoluteFill>
  );
};
```

## Tips

- 音频时长先用 `ffprobe` 获取，再按毫秒切分字幕，避免末尾超时。
- 长句建议拆成 1.0s - 2.5s 的短句，阅读性更好。
- 多场景项目建议把字幕数据放到 `src/data/*.ts`，组件只负责渲染。
- 如果需要自动转写，可引入 `@remotion/install-whisper-cpp` 生成初版时间轴，再人工校正。
