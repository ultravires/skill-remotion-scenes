import {Composition, Series} from 'remotion';
import {HeroScene} from './Scene';
import {DanmakuScene} from './DanmakuScene';
import {TerminalScene, TERMINAL_DURATION} from './TerminalScene';
import {SectionTitle} from './components/SectionTitle';
import {EditorScene} from './EditorScene';

const HERO_DURATION = 90;
const DANMAKU_DURATION = 120; // Extended slightly for better view
const SECTION_TITLE_DURATION = 90;
const EDITOR_DURATION = 300;
const TOTAL_DURATION = 
  HERO_DURATION + 
  SECTION_TITLE_DURATION + TERMINAL_DURATION + 
  SECTION_TITLE_DURATION + EDITOR_DURATION +
  SECTION_TITLE_DURATION + DANMAKU_DURATION;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="HeroVideo"
				component={() => (
					<Series>
						<Series.Sequence durationInFrames={HERO_DURATION}>
							<HeroScene />
						</Series.Sequence>
						<Series.Sequence durationInFrames={SECTION_TITLE_DURATION}>
							<SectionTitle title='如何安装技能？' sectionNumber={1} description='一行命令快速完成安装' />
						</Series.Sequence>
						<Series.Sequence durationInFrames={TERMINAL_DURATION}>
							<TerminalScene />
						</Series.Sequence>
						<Series.Sequence durationInFrames={SECTION_TITLE_DURATION}>
							<SectionTitle title='代码演示效果' sectionNumber={2} description='支持多行同步打字与自动滚动' />
						</Series.Sequence>
						<Series.Sequence durationInFrames={EDITOR_DURATION}>
							<EditorScene />
						</Series.Sequence>
						<Series.Sequence durationInFrames={SECTION_TITLE_DURATION}>
							<SectionTitle title='弹幕场景演示' sectionNumber={3} description='快速应用弹幕场景' />
						</Series.Sequence>
						<Series.Sequence durationInFrames={DANMAKU_DURATION}>
							<DanmakuScene />
						</Series.Sequence>
					</Series>
				)}
				durationInFrames={TOTAL_DURATION}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
