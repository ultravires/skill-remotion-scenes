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

## Terminal window

For example:

```tsx
import React from 'react';

import {TerminalHeader} from './TerminalHeader';

export type TerminalWindowProps = {
	children: React.ReactNode;
	/** 终端窗口标题栏文案 */
	title?: React.ReactNode;
};

export const TerminalWindow: React.FC<TerminalWindowProps> = ({children, title = 'Install skill-remotion-scenes'}) => {
	return (
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
};
```