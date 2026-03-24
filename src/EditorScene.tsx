import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CodeEditor } from './components/Terminal/CodeEditor';
import { COLORS } from './design-system/tokens';

const CODE = `import { useCurrentFrame, interpolate } from 'remotion';

export const MyComponent: React.FC = () => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  
  return (
    <div style={{ opacity }}>
      <h1>Hello Remotion</h1>
      <p>This is a code demo scene.</p>
      <p>Multiple lines type at once.</p>
      <p>And it scrolls if it's too long.</p>
      <p>Line 1</p>
      <p>Line 2</p>
      <p>Line 3</p>
      <p>Line 4</p>
      <p>Line 5</p>
      <p>Line 6</p>
      <p>Line 7</p>
      <p>Line 8</p>
      <p>Line 9</p>
      <p>Line 10</p>
      <p>Final Line</p>
    </div>
  );
};`;

export const EditorScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <CodeEditor 
        code={CODE} 
        title="MyComponent.tsx"
        typeSpeed={1.5}
      />
    </AbsoluteFill>
  );
};
