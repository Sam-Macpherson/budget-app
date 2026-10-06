import _ from 'lodash';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import moment from 'moment';
import typography from '../theme/typography';
import Button from './Button';

const MIN_DATE = new Date(1998, 4);

const MonthPickerModal = ({value, onSelect}) => {
  const [year, setYear] = useState(value.getFullYear());
  const now = new Date();
  const isDisabled = month => new Date(year, month) > now || new Date(year, month + 1) <= MIN_DATE;
  const canGoBack = year > MIN_DATE.getFullYear();
  const canGoForward = year < now.getFullYear();
  const isSelected = month => year === value.getFullYear() && month === value.getMonth();

  return (
    <View className="p-5">
      <View className="flex-row justify-between items-center h-11 mb-3">
        <Text className={typography.title}>Choose month</Text>
      </View>
      <View className="flex-row items-center justify-between mb-3">
        <Button
          variant="ghost"
          icon="chevronLeft"
          accessibilityLabel="Previous year"
          onPress={canGoBack ? () => setYear(year - 1) : undefined}
          className={canGoBack ? '' : 'opacity-0'}
        />
        <Text className={`${typography.title} tabular-nums`}>{year}</Text>
        <Button
          variant="ghost"
          icon="chevronRight"
          accessibilityLabel="Next year"
          onPress={canGoForward ? () => setYear(year + 1) : undefined}
          className={canGoForward ? '' : 'opacity-0'}
        />
      </View>
      {_.map(_.chunk(_.range(12), 4), row => (
        <View key={row[0]} className="flex-row mb-2">
          {_.map(row, month => {
            const disabled = isDisabled(month);
            const selected = isSelected(month);
            return (
              <Pressable
                key={month}
                disabled={disabled}
                onPress={() => onSelect(new Date(year, month))}
                className={`flex-1 h-11 mx-1 items-center justify-center rounded-xl ${
                  selected ? 'bg-ink' : 'bg-field active:bg-pressed'
                }`}>
                <Text
                  className={`text-body font-semibold ${
                    selected ? 'text-canvas' : disabled ? 'text-faint' : 'text-ink'
                  }`}>
                  {moment().month(month).format('MMM')}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default MonthPickerModal;
