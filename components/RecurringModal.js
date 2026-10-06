import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import typography from '../theme/typography';
import Button from './Button';
import SegmentedToggle from './SegmentedToggle';
import TextField from './TextField';

const KIND_OPTIONS = [
  {value: 'need', label: 'need', tone: 'need'},
  {value: 'want', label: 'want', tone: 'want'},
  {value: 'income', label: 'income', tone: 'income'},
];

const validate = (description, amount, day) => {
  if (_.isEmpty(description)) {
    return 'Give it a name.';
  }
  if (!(amount > 0)) {
    return 'Enter an amount.';
  }
  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return 'Day must be 1 to 31.';
  }
  return null;
};

const RecurringModal = ({item, onSave, onDelete}) => {
  const {colors} = useTheme();
  const [kind, setKind] = useState(item ? item.kind : 'need');
  const [description, setDescription] = useState(item ? item.description : '');
  const [amount, setAmount] = useState(item ? String(item.amount) : '');
  const [day, setDay] = useState(item ? String(item.day) : '1');
  const [error, setError] = useState(null);
  const amountInput = useRef(null);
  const dayInput = useRef(null);

  const save = () => {
    const parsed = {description: description.trim(), amount: Number(amount), day: Number(day)};
    const problem = validate(parsed.description, parsed.amount, parsed.day);
    if (problem) {
      setError(problem);
      return;
    }
    onSave({...item, kind, ...parsed});
  };

  return (
    <View className="p-5">
      <View className="flex-row justify-between items-center h-11 mb-3">
        <Text className={typography.title}>{item ? 'Edit recurring' : 'Add recurring'}</Text>
        {item && (
          <Button
            variant="ghost"
            icon="trash"
            iconColor={colors.DANGER}
            accessibilityLabel="Delete"
            onPress={() => onDelete(item)}
          />
        )}
      </View>
      <SegmentedToggle className="mb-4" options={KIND_OPTIONS} value={kind} onChange={setKind} />
      <View className="flex-row mb-4">
        <TextField
          className="flex-1 mr-2.5"
          label="memo"
          placeholder="Rent, Netflix…"
          value={description}
          onChangeText={setDescription}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => amountInput.current?.focus()}
        />
        <TextField
          ref={amountInput}
          className="w-[130px]"
          inputClassName="text-right"
          label="amount"
          prefix="$"
          placeholder="0.00"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => dayInput.current?.focus()}
        />
      </View>
      <View className="flex-row mb-4">
        <TextField
          ref={dayInput}
          className="w-[130px] mr-3"
          inputClassName="text-right"
          label="day of month"
          keyboardType="number-pad"
          maxLength={2}
          value={day}
          onChangeText={setDay}
          onSubmitEditing={save}
        />
        <Text
          className={`${
            error ? 'text-caption text-danger' : typography.caption
          } flex-1 self-end pb-1`}>
          {error ||
            (item
              ? 'Changes apply from the next time it is added.'
              : 'Added on this day every month. Short months use their last day.')}
        </Text>
      </View>
      <Button variant="primary" text="Save" onPress={save} />
    </View>
  );
};

export default RecurringModal;
