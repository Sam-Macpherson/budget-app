/**
 * Named colors for each theme. Tailwind classes read these through the CSS variables below (see
 * tailwind.config.js); JS that needs a raw color (SVG icons, navigation) uses useTheme().colors.
 *
 * NEED/WANT are one pair used everywhere (chart lines, pills, icons, toggles). Each theme's pair is
 * stepped apart in lightness - need darker, want lighter - so they stay distinguishable under
 * red-green color blindness, checked with the dataviz palette validator (CVD ΔE >= 8). *_TEXT are
 * shades of the same hues that keep that order and meet 4.5:1 on their *_TINT.
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

  NEED: '#1D761D',
  NEED_TEXT: '#6CA66C',
  NEED_TINT: 'rgba(29, 118, 29, 0.22)',

  WANT: '#D9751A',
  WANT_TEXT: '#EAB381',
  WANT_TINT: 'rgba(217, 117, 26, 0.22)',

  NEUTRAL_TINT: 'rgba(255, 255, 255, 0.08)',
  DANGER: '#E5534B',
};

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

  NEED: '#1F7D1F',
  NEED_TEXT: '#134B13',
  NEED_TINT: 'rgba(31, 125, 31, 0.13)',

  WANT: '#FF7600',
  WANT_TEXT: '#A64D00',
  WANT_TINT: 'rgba(255, 118, 0, 0.13)',

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
