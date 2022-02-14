import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import _ from 'lodash';
import incomeModal from '../styles/incomeModal.less';
import typography from '../styles/typography.less';
import expenseModal from "../styles/expenseModal.less";
import Button from "./Button";

const IncomeModal = ({onSubmit, entry, deleteEntry}) => {
  const [amount, setAmount] = useState(_.isNull(entry) ? 0 : entry.amount);
  const [description, setDescription] = useState(_.isNull(entry) ? '' : entry.description);
  const [valueTextInput, setValueTextInput] = useState(null);

  return (
    <View style={incomeModal.incomeModalContainer}>
      <View style={incomeModal.incomeModalHeader}>
        <Text style={[typography.largest, typography.italics]}>
          {_.isNull(entry) ? 'add' : 'edit'} income
        </Text>
        {_.isNull(entry) || (
          <Button
            onPress={() => deleteEntry(entry)}
            style={{marginLeft: 4}}
            image={require('../images/trash-can.png')}
          />
        )}
      </View>
      <View style={incomeModal.incomeDetails}>
        <TextInput
          onSubmitEditing={() => valueTextInput.focus()}
          defaultValue={_.isNull(entry) ? '' : entry.description}
          style={[incomeModal.incomeModalInput, {width: '65%'}]}
          onChangeText={setDescription}
          placeholder="Memo"
        />
        <TextInput
          ref={input => setValueTextInput(input)}
          onSubmitEditing={() => onSubmit({amount, description})}
          defaultValue={_.isNull(entry) ? '' : String(entry.amount)}
          style={[incomeModal.incomeModalInput, typography.rightAlign, {width: '35%'}]}
          onChangeText={value => setAmount(Number(value))}
          placeholder="0.00"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default IncomeModal;
