import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import _ from 'lodash';
import incomeModal from '../styles/incomeModal.less';
import typography from '../styles/typography.less';

const IncomeModal = ({onSubmit, entry}) => {
  const [amount, setAmount] = useState(_.isNull(entry) ? 0 : entry.amount);
  const [description, setDescription] = useState(_.isNull(entry) ? '' : entry.description);
  const [valueTextInput, setValueTextInput] = useState(null);

  return (
    <View style={incomeModal.incomeModalContainer}>
      <Text style={[typography.largest, typography.italics]}>add income</Text>
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
