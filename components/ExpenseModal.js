import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import expenseModal from '../styles/expenseModal.less';
import typography from '../styles/typography.less';
import Badge from './Badge';
import badge from '../styles/badge.less';
import {CATEGORY_NEED, CATEGORY_WANT} from '../Constants';

const ExpenseModal = ({onSubmit}) => {
  const [category, setCategory] = useState(CATEGORY_NEED);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [valueTextInput, setValueTextInput] = useState(null);
  const needBadgeStyle =
    category === CATEGORY_NEED ? badge['badge.white-on-green'] : badge['badge.green'];
  const wantBadgeStyle =
    category === CATEGORY_WANT ? badge['badge.white-on-orange'] : badge['badge.orange'];

  return (
    <View style={expenseModal.expenseModalContainer}>
      <Text style={[typography.largest, typography.italics]}>add expense</Text>
      <View style={expenseModal.expenseTypeAndValueContainer}>
        <View style={expenseModal.expenseType}>
          <Badge
            onPress={() => setCategory(CATEGORY_NEED)}
            text="need"
            textStyle={typography.largest}
            style={needBadgeStyle}
          />
          <Badge
            onPress={() => setCategory(CATEGORY_WANT)}
            text="want"
            textStyle={typography.largest}
            style={wantBadgeStyle}
          />
          <TextInput
            onSubmitEditing={() => valueTextInput.focus()}
            style={[expenseModal.expenseModalInput, {width: 135}]}
            onChangeText={setDescription}
            placeholder="Memo"
          />
        </View>
        <TextInput
          ref={input => setValueTextInput(input)}
          onSubmitEditing={() => onSubmit({category, amount, description})}
          style={[expenseModal.expenseModalInput, typography.rightAlign, {width: 80}]}
          onChangeText={value => setAmount(Number(value))}
          placeholder="0.00"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default ExpenseModal;
