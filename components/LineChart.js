import _ from 'lodash';
import React, {useState} from 'react';
import {View} from 'react-native';
import Svg, {Circle, Line, Path, Text as SvgText} from 'react-native-svg';
import {useTheme} from '../theme/ThemeProvider';

const PAD = {top: 10, right: 10, bottom: 26, left: 46};
const TICK_TARGET = 4;

const niceStep = rough => {
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const fraction = rough / magnitude;
  const nice =
    fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10;
  return nice * magnitude;
};

const withCommas = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Splits at null values so months without data render as gaps instead of dropping to zero.
const linePath = (values, x, y) =>
  _.reduce(
    values,
    (path, value, i) => {
      if (value === null) {
        return path;
      }
      const command = i === 0 || values[i - 1] === null ? 'M' : 'L';
      return `${path}${command}${x(i).toFixed(1)},${y(value).toFixed(1)}`;
    },
    '',
  );

/**
 * Multi-series line chart. Press and drag to move the selection; the parent renders the readout.
 *
 * @param labels {string[]} - x-axis label per point; null entries are skipped.
 * @param series {{key: string, color: string, values: (number|null)[]}[]}
 */
const LineChart = ({labels, series, selectedIndex, onSelect, height = 220}) => {
  const {colors} = useTheme();
  const [width, setWidth] = useState(0);
  const count = labels.length;
  const plotWidth = Math.max(0, width - PAD.left - PAD.right);
  const plotHeight = height - PAD.top - PAD.bottom;

  const maxValue = Math.max(1, ..._.flatMap(series, 'values').filter(v => v !== null));
  const step = niceStep(maxValue / TICK_TARGET);
  const top = Math.ceil(maxValue / step) * step;
  const ticks = _.range(0, top + step / 2, step);

  const x = i => PAD.left + (count > 1 ? (i * plotWidth) / (count - 1) : plotWidth / 2);
  const y = v => PAD.top + plotHeight - (v / top) * plotHeight;

  const select = locationX => {
    if (count === 0 || plotWidth === 0) {
      return;
    }
    const i = Math.round(((locationX - PAD.left) / plotWidth) * (count - 1));
    onSelect(_.clamp(i, 0, count - 1));
  };

  return (
    <View
      onLayout={e => setWidth(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onResponderGrant={e => select(e.nativeEvent.locationX)}
      onResponderMove={e => select(e.nativeEvent.locationX)}
      onResponderTerminationRequest={() => true}
      style={{height}}>
      {width > 0 && (
        <Svg width={width} height={height} pointerEvents="none">
          {ticks.map(tick => (
            <React.Fragment key={tick}>
              <Line
                x1={PAD.left}
                x2={width - PAD.right}
                y1={y(tick)}
                y2={y(tick)}
                stroke={colors.BORDER}
                strokeWidth={1}
              />
              <SvgText
                x={PAD.left - 8}
                y={y(tick) + 4}
                fontSize={11}
                fill={colors.TEXT_MUTED}
                textAnchor="end">
                {withCommas(tick)}
              </SvgText>
            </React.Fragment>
          ))}
          {labels.map(
            (label, i) =>
              label && (
                <SvgText
                  key={`label-${i}`}
                  x={x(i)}
                  y={height - 8}
                  fontSize={11}
                  fill={colors.TEXT_MUTED}
                  textAnchor={i === 0 ? 'start' : i === count - 1 ? 'end' : 'middle'}>
                  {label}
                </SvgText>
              ),
          )}
          {selectedIndex !== null && (
            <Line
              x1={x(selectedIndex)}
              x2={x(selectedIndex)}
              y1={PAD.top}
              y2={PAD.top + plotHeight}
              stroke={colors.TEXT_FAINT}
              strokeWidth={1}
            />
          )}
          {series.map(s => (
            <Path
              key={s.key}
              d={linePath(s.values, x, y)}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
          {selectedIndex !== null &&
            series.map(
              s =>
                s.values[selectedIndex] !== null && (
                  <Circle
                    key={`dot-${s.key}`}
                    cx={x(selectedIndex)}
                    cy={y(s.values[selectedIndex])}
                    r={5}
                    fill={s.color}
                    stroke={colors.SURFACE}
                    strokeWidth={2}
                  />
                ),
            )}
        </Svg>
      )}
    </View>
  );
};

export default LineChart;
