import _ from 'lodash';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import moment from 'moment';
import modal from '../styles/modal.less';
import styles from '../styles/monthPicker.less';
import typography from '../styles/typography.less';
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
    <View style={modal.sheet}>
      <View style={modal.sheetHeader}>
        <Text style={typography.title}>Choose month</Text>
      </View>
      <View style={styles.yearRow}>
        <Button
          variant="ghost"
          icon="chevronLeft"
          onPress={canGoBack ? () => setYear(year - 1) : undefined}
          style={!canGoBack && styles.hidden}
        />
        <Text style={[typography.title, styles.year]}>{year}</Text>
        <Button
          variant="ghost"
          icon="chevronRight"
          onPress={canGoForward ? () => setYear(year + 1) : undefined}
          style={!canGoForward && styles.hidden}
        />
      </View>
      {_.map(_.chunk(_.range(12), 4), row => (
        <View key={row[0]} style={styles.monthRow}>
          {_.map(row, month => {
            const disabled = isDisabled(month);
            const selected = isSelected(month);
            return (
              <Pressable
                key={month}
                disabled={disabled}
                onPress={() => onSelect(new Date(year, month))}
                style={({pressed}) => [
                  styles.month,
                  pressed && styles.monthPressed,
                  selected && styles.monthSelected,
                ]}>
                <Text
                  style={[
                    styles.monthText,
                    selected && styles.monthTextSelected,
                    disabled && styles.monthTextDisabled,
                  ]}>
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
