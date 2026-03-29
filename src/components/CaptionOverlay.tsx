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
		captions.find((caption) => currentMs >= caption.startMs && currentMs < caption.endMs) ?? null;

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
					textShadow: '0 2px 6px rgba(0,0,0,0.45)',
				}}
			>
				{activeCaption.text}
			</div>
		</div>
	);
};
