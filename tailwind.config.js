// Colors are CSS variables set at the app root from theme/palette.js, so every class follows the
// active light/dark theme without dark: variants.
const color = name => `var(--${name})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.js', './components/**/*.js', './screens/**/*.js', './theme/**/*.js'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: color('canvas'),
        surface: color('surface'),
        raised: color('raised'),
        field: color('field'),
        pressed: color('pressed'),
        line: color('line'),
        ink: color('ink'),
        muted: color('muted'),
        faint: color('faint'),
        need: {DEFAULT: color('need'), text: color('need-text'), tint: color('need-tint')},
        want: {DEFAULT: color('want'), text: color('want-text'), tint: color('want-tint')},
        neutral: {tint: color('neutral-tint')},
        danger: color('danger'),
      },
      fontSize: {
        label: '11px',
        caption: '12px',
        'amount-sm': '13px',
        body: '15px',
        input: '16px',
        title: '18px',
      },
    },
  },
  plugins: [],
};
