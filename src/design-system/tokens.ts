export const COLORS = {
  background: '#020617',
  backgroundElevated: '#0f172a',
  primary: '#3b82f6',
  text: '#ffffff',
  textSecondary: '#94a3b8',
};

/** 全片共用的径向渐变画布（与主色呼应的冷色光晕） */
export const VIDEO_RADIAL_BACKGROUND = [
  'radial-gradient(ellipse 100% 85% at 50% -5%, rgba(59, 130, 246, 0.28) 0%, transparent 52%)',
  'radial-gradient(ellipse 75% 60% at 85% 75%, rgba(168, 85, 247, 0.14) 0%, transparent 50%)',
  'radial-gradient(ellipse 90% 70% at 15% 90%, rgba(30, 64, 175, 0.2) 0%, transparent 55%)',
  COLORS.background,
].join(', ');

export const FONTS = {
  display: '"Inter", system-ui, -apple-system, sans-serif',
  text: '"Inter", system-ui, -apple-system, sans-serif',
  mono: 'Menlo, Monaco, "Courier New", monospace',
};

export const SIZES = {
  h1: 120,
  h4: 48,
  spacing: {
    sm: 24,
    md: 48,
  },
};
