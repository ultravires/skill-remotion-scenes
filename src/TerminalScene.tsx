import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import React from 'react';
import {TerminalWindow} from './components/Terminal/TerminalWindow';
import {TerminalInput} from './components/Terminal/TerminalInput';
import {TerminalOutput} from './components/Terminal/TerminalOutput';

export const COMMAND = 'npx skills add https://github.com/ultravires/skill-remotion-scenes --skill skill-remotion-scenes';
export const TYPE_SPEED = 2; // frames per character
export const PAUSE_FRAMES = 120; // 4 seconds at 30fps to read the complex output
export const TERMINAL_DURATION = COMMAND.length * TYPE_SPEED + PAUSE_FRAMES;

const SkillsLog: React.FC = () => {
	return (
		<>
			<div style={{color: '#999', marginBottom: 10}}>npm http fetch GET 200 https://registry.npmmirror.com/skills 99ms (cache revalidated)</div>
			<div style={{color: '#60a5fa', marginBottom: 10, fontWeight: 'bold'}}>
{`███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`}
			</div>
			<div style={{marginTop: 15}}>
				<div style={{color: '#999'}}>┌   skills</div>
				<div style={{color: '#999'}}>│</div>
				<div><span style={{color: '#60a5fa'}}>◇</span>  Source: https://github.com/ultravires/skill-remotion-scenes.git</div>
				<div style={{color: '#999'}}>│</div>
				<div><span style={{color: '#27c93f'}}>◇</span>  Repository cloned</div>
				<div style={{color: '#999'}}>│</div>
				<div><span style={{color: '#27c93f'}}>◇</span>  Found 1 skill</div>
				<div style={{color: '#999'}}>│</div>
				<div><span style={{color: '#27c93f'}}>●</span>  Selected 1 skill: <span style={{color: '#27c93f', fontWeight: 'bold'}}>skill-remotion-scenes</span></div>
			</div>
		</>
	);
};

export const TerminalScene: React.FC = () => {
	const frame = useCurrentFrame();
	const isFinished = frame >= COMMAND.length * TYPE_SPEED;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#020617',
				justifyContent: 'center',
				alignItems: 'center',
				padding: 60,
			}}
		>
			<TerminalWindow>
				<TerminalInput
					command={COMMAND}
					frame={frame}
					typeSpeed={TYPE_SPEED}
				/>
				<TerminalOutput visible={isFinished}>
					<SkillsLog />
				</TerminalOutput>
			</TerminalWindow>
		</AbsoluteFill>
	);
};
