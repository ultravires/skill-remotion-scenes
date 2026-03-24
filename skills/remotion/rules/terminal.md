---
name: terminal
description: Display text in the terminal with a typewriter effect.
metadata:
  tags: terminal, typewriter, command line
---

# Terminal

Display text in the terminal with a typewriter effect.

## Terminal Header

Terminal header is used to tell user what to do.

For example:

```tsx
const TerminalHeader: React.FC = () => {
	return (
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
			<div style={{display: 'flex', gap: 8}}>
				<div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56'}} />
				<div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e'}} />
				<div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f'}} />
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
				Install skill-remotion-scenes
			</div>
		</div>
	);
};
```

## Terminal input

Display text with a typewriter effect.

For example:

```tsx
import React from 'react';

interface TerminalInputProps {
	command: string;
	frame: number;
	typeSpeed: number;
	fontSize?: number;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({command, frame, typeSpeed, fontSize = 24}) => {
	const charsToShow = Math.floor(frame / typeSpeed);
	const displayedCommand = command.substring(0, charsToShow);
	const isFinished = charsToShow >= command.length;
	const cursorOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

	return (
		<div style={{marginBottom: 15, fontSize}}>
			<span style={{color: '#27c93f', marginRight: 15}}>$</span>
			{displayedCommand}
			{!isFinished && (
				<span
					style={{
						display: 'inline-block',
						width: 10,
						height: fontSize,
						backgroundColor: '#fff',
						marginLeft: 5,
						verticalAlign: 'middle',
						opacity: cursorOpacity,
					}}
				/>
			)}
		</div>
	);
};
```

## Terminal output

Display terminal output.

For example:

```tsx
import React from 'react';

interface TerminalOutputProps {
	children: React.ReactNode;
	visible: boolean;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({children, visible}) => {
	if (!visible) return null;
	
	return (
		<div style={{color: '#ddd', marginTop: 10, animation: 'fadeIn 0.3s'}}>
			{children}
		</div>
	);
};
```