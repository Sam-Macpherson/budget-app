import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import ColorPalette from '../ColorPalette';
import modal from '../styles/modal.less';
import typography from '../styles/typography.less';
import Button from './Button';
import TextField from './TextField';

const IncomeModal = ({onSubmit, entry, deleteEntry}) => {
  const [amount, setAmount] = useState(_.isNull(entry) ? 0 : entry.amount);
  const [description, setDescription] = useState(_.isNull(entry) ? '' : entry.description);
  const amountInput = useRef(null);
  const submit = () => onSubmit({amount, description});

  return (
    <View style={modal.sheet}>
      <View style={modal.sheetHeader}>
        <Text style={typography.title}>{_.isNull(entry) ? 'Add income' : 'Edit income'}</Text>
        {_.isNull(entry) || (
          <Button
            variant="ghost"
            icon="trash"
            iconColor={ColorPalette.DANGER}
            onPress={() => deleteEntry(entry)}
          />
        )}
      </View>
      <View style={modal.fieldRow}>
        <TextField
          style={modal.memoField}
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
          style={modal.amountField}
          inputStyle={typography.rightAlign}
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
