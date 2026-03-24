import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import React, {useMemo} from 'react';

const COLORS = ['#ffffff', '#ff0000', '#00ff00', '#60a5fa', '#ffff00', '#ff00ff', '#00ffff', '#a855f7'];

const MESSAGES = [
	'这个弹幕效果太强了！',
	'Remotion 还能这么玩？',
	'全自动生成视频，真香',
	'支持各种场景，列表、流程图都有',
	'前端工程师的福音',
	'666666',
	'专业的视频生成技能',
	'代码即视频',
	'我也想学这个',
	'已键三连',
	'各种场景应有尽有',
	'这个技能必须点赞',
];

const DanmakuItem: React.FC<{
	text: string;
	top: number;
	startFrame: number;
	duration: number;
	color: string;
	fontSize: number;
}> = ({text, top, startFrame, duration, color, fontSize}) => {
	const frame = useCurrentFrame();
	const {width} = useVideoConfig();

	const relativeFrame = frame - startFrame;
	if (relativeFrame < 0 || relativeFrame > duration) {
		return null;
	}

	const left = interpolate(relativeFrame, [0, duration], [width, -text.length * fontSize * 1.5], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

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

export const DanmakuScene: React.FC = () => {
	const {fps, durationInFrames} = useVideoConfig();

	const items = useMemo(() => {
		return new Array(40).fill(0).map((_, i) => {
			const seed = i * 123.45;
			const random = (s: number) => {
				const x = Math.sin(s) * 10000;
				return x - Math.floor(x);
			};

			return {
				text: MESSAGES[Math.floor(random(seed) * MESSAGES.length)],
				top: 10 + random(seed + 1) * 80,
				startFrame: random(seed + 2) * (durationInFrames - 30),
				duration: 100 + random(seed + 3) * 60,
				color: COLORS[Math.floor(random(seed + 4) * COLORS.length)],
				fontSize: 24 + random(seed + 5) * 24,
			};
		});
	}, [durationInFrames]);

	return (
		<AbsoluteFill>
			<div style={{position: 'absolute', inset: 0, opacity: 0.3}}>
				{/* Background Title for context */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
						fontSize: 100,
						fontWeight: 'bold',
						color: 'white',
						fontFamily: 'sans-serif',
					}}
				>
					弹幕场景演示
				</div>
			</div>
			{items.map((item, i) => (
				<DanmakuItem key={i} {...item} />
			))}
		</AbsoluteFill>
	);
};
