import _ from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import LineChart from '../components/LineChart';
import Screen from '../components/Screen';
import SegmentedToggle from '../components/SegmentedToggle';
import si from '../storage/storage';
import {useTheme} from '../theme/ThemeProvider';
import typography from '../theme/typography';
import formatAmount from '../utils/formatAmount';

const RANGES = [
  {value: 6, label: '6M', tone: 'neutral'},
  {value: 12, label: '1Y', tone: 'neutral'},
  {value: 24, label: '2Y', tone: 'neutral'},
];

const TARGETS = {need: 0.5, want: 0.3};

// Long ranges label every 3rd/6th month and include the year, since the axis spans two of them.
// Wide enough spacing that the right-aligned last label never collides with its neighbour.
const axisLabels = months => {
  const every = months.length <= 6 ? 1 : months.length <= 12 ? 3 : 6;
  const format = months.length <= 6 ? 'MMM' : "MMM 'YY";
  const last = months.length - 1;
  return months.map((m, i) => ((last - i) % every === 0 ? moment(m.month).format(format) : null));
};

const LineKey = ({color}) => (
  <View className="w-3 h-0.5 rounded-full mr-1.5" style={{backgroundColor: color}} />
);

const AverageTile = ({label, average, share, target, className = ''}) => (
  <View className={`flex-1 p-3 rounded-2xl bg-surface ${className}`}>
    <Text className={typography.label}>{label}</Text>
    <Text className="text-title font-semibold text-ink mt-1">{formatAmount(average)}</Text>
    <Text className={`${typography.caption} mt-0.5`}>
      {share === null ? 'no income logged' : `${Math.round(share * 100)}% of income`}
    </Text>
    <Text className={typography.caption}>target {target * 100}%</Text>
  </View>
);

const AnalyticsScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [range, setRange] = useState(6);
  const [months, setMonths] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = useCallback(() => {
    si.getMonthlyTotals(new Date(), range).then(totals => {
      setMonths(totals);
      setSelected(totals.length - 1);
    });
  }, [range]);
  useFocusEffect(load);
  useEffect(() => si.subscribe(load), [load]);

  const withData = _.filter(months, 'hasData');
  const income = _.sumBy(withData, 'income');
  const average = key => (withData.length ? _.sumBy(withData, key) / withData.length : 0);
  const share = key => (income > 0 ? _.sumBy(withData, key) / income : null);
  const valuesFor = key => months.map(m => (m.hasData ? m[key] : null));
  const current = selected !== null ? months[selected] : null;

  return (
    <Screen title="Analytics" onMenu={navigation.openDrawer}>
      <ScrollView className="flex-1">
        <SegmentedToggle className="mb-3" options={RANGES} value={range} onChange={setRange} />

        <View className="p-3 mb-3 rounded-2xl bg-surface">
          <Text className={typography.caption}>
            {current ? moment(current.month).format('MMMM YYYY') : ' '}
            {current && !current.hasData ? ' · no entries' : ''}
          </Text>
          <View className="flex-row mt-1 mb-2">
            {[
              {key: 'need', label: 'need', color: colors.NEED},
              {key: 'want', label: 'want', color: colors.WANT},
            ].map(s => (
              <View key={s.key} className="mr-6">
                <Text className="text-title font-semibold text-ink">
                  {current && current.hasData ? formatAmount(current[s.key]) : '—'}
                </Text>
                <View className="flex-row items-center">
                  <LineKey color={s.color} />
                  <Text className={typography.caption}>{s.label}</Text>
                </View>
              </View>
            ))}
          </View>
          <LineChart
            labels={axisLabels(months)}
            series={[
              {key: 'need', color: colors.NEED, values: valuesFor('need')},
              {key: 'want', color: colors.WANT, values: valuesFor('want')},
            ]}
            selectedIndex={selected}
            onSelect={setSelected}
          />
        </View>

        <View className="flex-row mb-3">
          <AverageTile
            label="avg need / month"
            average={average('need')}
            share={share('need')}
            target={TARGETS.need}
          />
          <AverageTile
            className="ml-3"
            label="avg want / month"
            average={average('want')}
            share={share('want')}
            target={TARGETS.want}
          />
        </View>

        <View className="px-3 py-1 mb-3 rounded-2xl bg-surface">
          <View className="flex-row py-2.5 border-b border-line">
            <Text className={`${typography.label} flex-1`}>month</Text>
            <Text className={`${typography.label} w-24 text-right`}>need</Text>
            <Text className={`${typography.label} w-24 text-right`}>want</Text>
          </View>
          {_.reverse([...months]).map((m, i) => (
            <View
              key={m.month.toISOString()}
              className={`flex-row py-2.5 border-line ${
                i === months.length - 1 ? '' : 'border-b'
              }`}>
              <Text className={`${typography.body} flex-1`}>
                {moment(m.month).format('MMM YYYY')}
              </Text>
              <Text className={`${typography.amount} text-ink w-24 text-right`}>
                {m.hasData ? formatAmount(m.need) : '—'}
              </Text>
              <Text className={`${typography.amount} text-ink w-24 text-right`}>
                {m.hasData ? formatAmount(m.want) : '—'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default AnalyticsScreen;
