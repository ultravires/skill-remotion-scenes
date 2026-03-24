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
