import React from 'react';
import { View, Text } from 'react-native';
import { text, colors } from '../styles';

interface TransactionItemProps {
  currencies: string,
  date: string | Date,
  amount: string | number,
  focused?: boolean
}

const TransactionItem = (props: TransactionItemProps) => {
  const [cur1, cur2] = props.currencies.split(' ');
  const amount = parseFloat(props.amount + '').toFixed(2);

  return (
    <View style={{
      padding: 16,
      flex: 0,
      flexDirection: 'row',
      backgroundColor: props.focused ? '#F5F5F5' : '#FFF',
      justifyContent: 'space-between',
      alignItems: 'stretch'
    }}>
      <View style={{
        flexDirection: 'column'
      }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{
            ...text.regular,
            fontWeight: '500'
          }}>{cur1} </Text>
          <Text style={{
            ...text.regular
          }}>{cur2}</Text>
        </View>
        <Text style={{
          ...text.regular,
          color: colors.inactiveIcons
        }}>{props.date}</Text>
      </View>
      <Text style={{...text.regular, alignSelf: 'flex-start'}}>{cur1} {amount}</Text>
    </View>
  );
}

export { TransactionItem };