import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import hljs from 'highlight.js';
import { COLORS, FONTS } from '../../design-system/tokens';
import { HljsTheme } from '../../design-system/hljs-theme';
import { TerminalWindow } from './TerminalWindow';

interface CodeEditorProps {
  code: string;
  language?: string;
  title?: string;
  typeSpeed?: number;
  startFrame?: number;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language = 'typescript',
  title = 'index.ts',
  typeSpeed = 1,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  // 1. 获取原始代码行
  const lines = useMemo(() => code.split('\n'), [code]);

  // 2. 高亮代码并尝试按行拆分
  // 为保证高亮质量（支持跨行注释/字符串），先整体高亮再尝试安全拆分
  const highlightedLines = useMemo(() => {
    const highlighted = hljs.highlight(code, { language }).value;
    // 简单的按行拆分，对于大多数演示代码够用了
    // 如果有跨行标签，可能导致显示不准确，但在快速打字效果中通常不明显
    return highlighted.split('\n');
  }, [code, language]);
  
  const maxLineLength = useMemo(() => Math.max(...lines.map(l => l.length)), [lines]);
  const duration = maxLineLength * typeSpeed;

  const isFinished = relativeFrame >= duration;

  // 滚动逻辑
  const visibleLinesCount = 18;
  const lineWeight = 28;
  
  let translateY = 0;
  if (lines.length > visibleLinesCount) {
    const scrollStartFrame = duration + 30;
    translateY = interpolate(
      frame,
      [scrollStartFrame, scrollStartFrame + 120],
      [0, -(lines.length - visibleLinesCount) * lineWeight],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.quad),
      }
    );
  }

  return (
    <TerminalWindow title={title}>
      {/* 注入 highlight.js 样式 */}
      <style dangerouslySetInnerHTML={{ __html: HljsTheme }} />
      
      <div style={{ 
        overflow: 'hidden', 
        height: visibleLinesCount * lineWeight,
        position: 'relative',
        fontFamily: FONTS.mono,
        fontSize: 18,
        lineHeight: `${lineWeight}px`,
        backgroundColor: '#1e1e1e', // 适配终端背景
      }}>
        <div style={{ transform: `translateY(${translateY}px)` }}>
          {highlightedLines.map((hLine, i) => {
            const rawLine = lines[i] || '';
            const charsToShow = Math.floor(relativeFrame / typeSpeed);
            // 虽然是同步打字，但每一行还是只显示部分内容
            // 使用 overflow: hidden 和 width: ch 来裁剪 HTML 极其方便
            const progress = Math.min(charsToShow, rawLine.length);
            
            return (
              <div key={i} style={{ display: 'flex' }}>
                <span style={{ 
                  width: 40, 
                  display: 'inline-block', 
                  color: '#555', 
                  textAlign: 'right', 
                  paddingRight: 20,
                  userSelect: 'none'
                }}>
                  {i + 1}
                </span>
                <div style={{ 
                  position: 'relative',
                  whiteSpace: 'pre',
                  overflow: 'hidden',
                  width: `${progress}ch`, // 使用 ch 单位精确控制显示的字符数
                }}>
                  <span 
                    className="hljs" // 应用主题样式
                    style={{ background: 'transparent', padding: 0 }}
                    dangerouslySetInnerHTML={{ __html: hLine }} 
                  />
                  {/* 光标跟随（仅限第一行作为示例，或者可以给每一行都加上） */}
                  {!isFinished && progress > 0 && progress < rawLine.length && i === 0 && (
                    <span style={{
                      position: 'absolute',
                      right: 0,
                      top: 4,
                      width: 8,
                      height: 20,
                      backgroundColor: COLORS.primary,
                      opacity: Math.floor(frame / 5) % 2 === 0 ? 1 : 0
                    }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TerminalWindow>
  );
};
