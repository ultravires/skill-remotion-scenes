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
