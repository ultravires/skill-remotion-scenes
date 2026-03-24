---
name: hero
description: Hero section is the primary top banner section that delivers core information, creates first impressions.
metadata:
  tags: hero, banner
---

# Hero Section

Hero section is the primary top banner section that delivers core information, creates first impressions.

## When to use

- Tell users who am I
- Tell users what I can do

## Example

```tsx
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import React from 'react';

const Title: React.FC<{text: string; frame: number; fps: number}> = ({text, frame, fps}) => {
	const opacity = interpolate(frame, [0, 15], [0, 1]);
	const scale = spring({
		frame,
		fps,
		config: {
			damping: 10,
		},
	});

	return (
		<h1
			style={{
				fontSize: 120,
				marginBottom: 20,
				opacity,
				transform: `scale(${scale})`,
				fontWeight: 'bold',
				textAlign: 'center',
				background: 'linear-gradient(to right, #60a5fa, #a855f7)',
				WebkitBackgroundClip: 'text',
				WebkitTextFillColor: 'transparent',
			}}
		>
			{text}
		</h1>
	);
};

const Subtitle: React.FC<{text: string; frame: number; fps: number}> = ({text, frame, fps}) => {
	const opacity = interpolate(frame, [10, 25], [0, 1], {extrapolateLeft: 'clamp'});

	return (
		<h2
			style={{
				fontSize: 60,
				color: '#e2e8f0',
				opacity,
				textAlign: 'center',
				fontWeight: 300,
			}}
		>
			{text}
		</h2>
	);
};

const FeatureItem: React.FC<{text: string; frame: number; fps: number; index: number}> = ({text, frame, fps, index}) => {
	const startFrame = 30 + index * 5;
	const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {extrapolateLeft: 'clamp'});
	const scale = spring({
		frame: frame - startFrame,
		fps,
		config: {damping: 12},
	});

	return (
		<div
			style={{
				padding: '10px 25px',
				margin: '10px',
				backgroundColor: 'rgba(255, 255, 255, 0.1)',
				borderRadius: '15px',
				fontSize: 32,
				color: '#f8fafc',
				opacity,
				transform: `scale(${scale})`,
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.1)',
			}}
		>
			{text}
		</div>
	);
};

export const HeroScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const features = [
		'弹幕',
		'终端',
		'列表',
		'里程碑',
		'流程图',
		'对比',
		'时间轴',
		'各种场景',
	];

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#020617',
				fontFamily: 'system-ui, -apple-system, sans-serif',
				padding: '0 40px',
			}}
		>
			<Title text="skill-remotion-scenes" frame={frame} fps={fps} />
			<Subtitle text="专业的场景视频生成技能" frame={frame} fps={fps} />
			
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					marginTop: 60,
					maxWidth: 1200,
				}}
			>
				{features.map((feature, i) => (
					<FeatureItem key={feature} text={feature} index={i} frame={frame} fps={fps} />
				))}
			</div>
		</AbsoluteFill>
	);
};
```
