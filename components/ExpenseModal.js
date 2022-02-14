import {Image, Text, TextInput, View} from 'react-native';
import _ from 'lodash';
import React, {useState} from 'react';
import expenseModal from '../styles/expenseModal.less';
import typography from '../styles/typography.less';
import Badge from './Badge';
import badge from '../styles/badge.less';
import {CATEGORY_NEED, CATEGORY_WANT} from '../Constants';
import Button from './Button';

const ExpenseModal = ({onSubmit, entry, deleteEntry}) => {
  const [category, setCategory] = useState(_.isNull(entry) ? CATEGORY_WANT : entry.category);
  const [amount, setAmount] = useState(_.isNull(entry) ? 0 : entry.amount);
  const [description, setDescription] = useState(_.isNull(entry) ? '' : entry.description);
  const [valueTextInput, setValueTextInput] = useState(null);
  const needBadgeStyle =
    category === CATEGORY_NEED ? badge['badge.white-on-green'] : badge['badge.green'];
  const wantBadgeStyle =
    category === CATEGORY_WANT ? badge['badge.white-on-orange'] : badge['badge.orange'];

  return (
    <View style={expenseModal.expenseModalContainer}>
      <View style={expenseModal.expenseModalHeader}>
        <Text style={[typography.largest, typography.italics]}>
          {_.isNull(entry) ? 'add' : 'edit'} expense
        </Text>
        {_.isNull(entry) || (
          <Button
            onPress={() => deleteEntry(entry)}
            style={{marginLeft: 4}}
            image={require('../images/trash-can.png')}
          />
        )}
      </View>
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
        </View>
        <View style={expenseModal.expenseDetails}>
          <TextInput
            onSubmitEditing={() => valueTextInput.focus()}
            defaultValue={_.isNull(entry) ? '' : entry.description}
            style={[expenseModal.expenseModalInput]}
            onChangeText={setDescription}
            placeholder="Memo"
          />
          <TextInput
            ref={input => setValueTextInput(input)}
            onSubmitEditing={() => onSubmit({category, amount, description})}
            defaultValue={_.isNull(entry) ? '' : String(entry.amount)}
            style={[expenseModal.expenseModalInput, typography.rightAlign]}
            onChangeText={value => setAmount(Number(value))}
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

export default ExpenseModal;
