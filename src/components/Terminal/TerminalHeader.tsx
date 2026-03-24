import React from 'react';

export type TerminalHeaderProps = {
	/** 中间标题，不传则只保留布局占位 */
	title?: React.ReactNode;
};

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({title}) => {
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
				{title}
			</div>
		</div>
	);
};
