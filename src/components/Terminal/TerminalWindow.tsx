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
