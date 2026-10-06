import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import typography from '../theme/typography';
import Button from './Button';
import TextField from './TextField';

const IncomeModal = ({onSubmit, entry, deleteEntry}) => {
  const {colors} = useTheme();
  const [amount, setAmount] = useState(_.isNull(entry) ? 0 : entry.amount);
  const [description, setDescription] = useState(_.isNull(entry) ? '' : entry.description);
  const amountInput = useRef(null);
  const submit = () => onSubmit({amount, description});

  return (
    <View className="p-5">
      <View className="flex-row justify-between items-center h-11 mb-3">
        <Text className={typography.title}>{_.isNull(entry) ? 'Add income' : 'Edit income'}</Text>
        {_.isNull(entry) || (
          <Button
            variant="ghost"
            icon="trash"
            iconColor={colors.DANGER}
            accessibilityLabel="Delete"
            onPress={() => deleteEntry(entry)}
          />
        )}
      </View>
      <View className="flex-row mb-4">
        <TextField
          className="flex-1 mr-2.5"
          label="memo"
          placeholder="Where from?"
          defaultValue={_.isNull(entry) ? '' : entry.description}
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
          defaultValue={_.isNull(entry) ? '' : String(entry.amount)}
          onChangeText={value => setAmount(Number(value))}
          onSubmitEditing={submit}
        />
      </View>
      <Button variant="primary" text="Save" onPress={submit} />
    </View>
  );
};

export default IncomeModal;
