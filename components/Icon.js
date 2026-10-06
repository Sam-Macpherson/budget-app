import React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {useTheme} from '../theme/ThemeProvider';

const ICONS = {
  receipt: (
    <>
      <Path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z" />
      <Path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  coin: (
    <>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M14.5 9.5c-.3-1-1.3-1.6-2.5-1.6-1.4 0-2.5.8-2.5 1.9 0 2.6 5 1.4 5 4.2 0 1.1-1.1 2-2.5 2-1.3 0-2.3-.7-2.6-1.7M12 6.5v1.4M12 16v1.5" />
    </>
  ),
  trash: (
    <>
      <Path d="M4 7h16M9.5 7V4.5h5V7" />
      <Path d="M6.5 7l.9 12.5a1.5 1.5 0 001.5 1.5h6.2a1.5 1.5 0 001.5-1.5L17.5 7" />
      <Path d="M10 11v6M14 11v6" />
    </>
  ),
  more: (
    <>
      <Circle cx="5.5" cy="12" r="1.25" />
      <Circle cx="12" cy="12" r="1.25" />
      <Circle cx="18.5" cy="12" r="1.25" />
    </>
  ),
  calendar: (
    <>
      <Rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <Path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  chevronDown: <Path d="M7 10l5 5 5-5" />,
  chevronLeft: <Path d="M14 7l-5 5 5 5" />,
  chevronRight: <Path d="M10 7l5 5-5 5" />,
  upload: (
    <Path d="M12 15V4M7.5 8.5L12 4l4.5 4.5M4.5 15v3a2.5 2.5 0 002.5 2.5h10a2.5 2.5 0 002.5-2.5v-3" />
  ),
  download: (
    <Path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M4.5 15v3a2.5 2.5 0 002.5 2.5h10a2.5 2.5 0 002.5-2.5v-3" />
  ),
  check: <Path d="M5 12.5l4.5 4.5L19 7.5" />,
  menu: <Path d="M4 7h16M4 12h16M4 17h16" />,
  plus: <Path d="M12 5v14M5 12h14" />,
  sun: (
    <>
      <Circle cx="12" cy="12" r="4" />
      <Path d="M12 2.5v2M12 19.5v2M4.6 4.6L6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
    </>
  ),
  moon: <Path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />,
  wallet: (
    <>
      <Path d="M5 8V7.5A2.5 2.5 0 017.5 5H17v3" />
      <Rect x="3.5" y="8" width="17" height="11.5" rx="2.5" />
      <Path d="M16 13.75h.01" strokeWidth={2.6} />
    </>
  ),
  repeat: (
    <>
      <Path d="M17 3.5l3 3-3 3" />
      <Path d="M4 11.5v-1.5a3.5 3.5 0 013.5-3.5H20" />
      <Path d="M7 20.5l-3-3 3-3" />
      <Path d="M20 12.5V14a3.5 3.5 0 01-3.5 3.5H4" />
    </>
  ),
};

const Icon = ({name, size = 22, color, strokeWidth = 1.8}) => {
  const {colors} = useTheme();
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || colors.TEXT}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round">
      {ICONS[name]}
    </Svg>
  );
};

export default Icon;
