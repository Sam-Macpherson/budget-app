import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import typography from '../theme/typography';
import formatAmount from '../utils/formatAmount';
import Icon from './Icon';

const TONES = {
  need: {bg: 'bg-need-tint', fg: 'NEED_TEXT'},
  want: {bg: 'bg-want-tint', fg: 'WANT_TEXT'},
  income: {bg: 'bg-neutral-tint', fg: 'NEED_TEXT'},
};

/**
 * One budget line: tinted need/want/income icon, description (+ optional subtitle), amount.
 */
const ListRow = ({tone, description, subtitle, amount, recurring, isLast}) => {
  const {colors} = useTheme();
  const isIncome = tone === 'income';
  return (
    <View className={`flex-row items-center py-2.5 border-line ${isLast ? '' : 'border-b'}`}>
      <View className={`items-center justify-center w-9 h-9 rounded-[10px] mr-3 ${TONES[tone].bg}`}>
        <Icon name={isIncome ? 'coin' : 'receipt'} size={20} color={colors[TONES[tone].fg]} />
      </View>
      <View className="flex-1 mr-3">
        <View className="flex-row items-center">
          <Text className={`${typography.body} shrink mr-1.5`} numberOfLines={1}>
            {description}
          </Text>
          {recurring && <Icon name="repeat" size={14} color={colors.TEXT_FAINT} />}
        </View>
        {subtitle && <Text className={typography.caption}>{subtitle}</Text>}
      </View>
      <Text className={`${typography.amount} ${isIncome ? 'text-need-text' : 'text-ink'}`}>
        {isIncome ? '+' : ''}
        {formatAmount(amount)}
      </Text>
    </View>
  );
};

export default ListRow;
