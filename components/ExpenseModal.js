import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {CATEGORY_NEED, CATEGORY_WANT} from '../Constants';
import ColorPalette from '../ColorPalette';
import modal from '../styles/modal.less';
import typography from '../styles/typography.less';
import Button from './Button';
import SegmentedToggle from './SegmentedToggle';
import TextField from './TextField';

const CATEGORY_OPTIONS = [
  {value: CATEGORY_NEED, label: 'need', tone: 'need'},
  {value: CATEGORY_WANT, label: 'want', tone: 'want'},
];

const ExpenseModal = ({onSubmit, entry, deleteEntry}) => {
  const [category, setCategory] = useState(_.isNull(entry) ? CATEGORY_WANT : entry.category);
  const [amount, setAmount] = useState(_.isNull(entry) ? 0 : entry.amount);
  const [description, setDescription] = useState(_.isNull(entry) ? '' : entry.description);
  const amountInput = useRef(null);
  const submit = () => onSubmit({category, amount, description});

  return (
    <View style={modal.sheet}>
      <View style={modal.sheetHeader}>
        <Text style={typography.title}>{_.isNull(entry) ? 'Add expense' : 'Edit expense'}</Text>
        {_.isNull(entry) || (
          <Button
            variant="ghost"
            icon="trash"
            iconColor={ColorPalette.DANGER}
            onPress={() => deleteEntry(entry)}
          />
        )}
      </View>
      <SegmentedToggle
        style={modal.section}
        options={CATEGORY_OPTIONS}
        value={category}
        onChange={setCategory}
      />
      <View style={modal.fieldRow}>
        <TextField
          style={modal.memoField}
          label="memo"
          placeholder="What was it?"
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

export default ExpenseModal;
