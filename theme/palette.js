/**
 * Named colors for each theme. Tailwind classes read these through the CSS variables below (see
 * tailwind.config.js); JS that needs a raw color (SVG icons, navigation) uses useTheme().colors.
 */
const DARK = {
  BG: '#141414',
  SURFACE: '#1F1F1F',
  SURFACE_RAISED: '#282828',
  FIELD: '#333333',
  PRESSED: '#3C3C3C',
  BORDER: '#2E2E2E',
  BACKDROP: 'rgba(0, 0, 0, 0.6)',

  TEXT: '#F2F2F2',
  TEXT_MUTED: '#9A9A9A',
  TEXT_FAINT: '#6E6E6E',

  NEED: '#228B22',
  NEED_TEXT: '#7CCB7C',
  NEED_TINT: 'rgba(34, 139, 34, 0.22)',

  WANT: '#FF7600',
  WANT_TEXT: '#FFA25E',
  WANT_TINT: 'rgba(255, 118, 0, 0.2)',

  NEUTRAL_TINT: 'rgba(255, 255, 255, 0.08)',
  DANGER: '#E5534B',
};

// Greens and oranges are darkened for contrast on white.
const LIGHT = {
  BG: '#F4F4F1',
  SURFACE: '#FFFFFF',
  SURFACE_RAISED: '#FFFFFF',
  FIELD: '#EDEDEA',
  PRESSED: '#E2E2DE',
  BORDER: '#ECECE8',
  BACKDROP: 'rgba(0, 0, 0, 0.35)',

  TEXT: '#171717',
  TEXT_MUTED: '#6B6B68',
  TEXT_FAINT: '#A3A3A0',

  NEED: '#228B22',
  NEED_TEXT: '#1F7A1F',
  NEED_TINT: 'rgba(34, 139, 34, 0.13)',

  WANT: '#FF7600',
  WANT_TEXT: '#C05600',
  WANT_TINT: 'rgba(255, 118, 0, 0.14)',

  NEUTRAL_TINT: 'rgba(0, 0, 0, 0.06)',
  DANGER: '#D0392F',
};

const PALETTES = {dark: DARK, light: LIGHT};

const cssVariables = colors => ({
  '--canvas': colors.BG,
  '--surface': colors.SURFACE,
  '--raised': colors.SURFACE_RAISED,
  '--field': colors.FIELD,
  '--pressed': colors.PRESSED,
  '--line': colors.BORDER,
  '--ink': colors.TEXT,
  '--muted': colors.TEXT_MUTED,
  '--faint': colors.TEXT_FAINT,
  '--need': colors.NEED,
  '--need-text': colors.NEED_TEXT,
  '--need-tint': colors.NEED_TINT,
  '--want': colors.WANT,
  '--want-text': colors.WANT_TEXT,
  '--want-tint': colors.WANT_TINT,
  '--neutral-tint': colors.NEUTRAL_TINT,
  '--danger': colors.DANGER,
});

export {PALETTES, cssVariables};
