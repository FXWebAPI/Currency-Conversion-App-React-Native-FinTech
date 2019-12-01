import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { text, colors } from '../styles';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import Icon from '../components/Icon';
import { MaterialIcons } from '@expo/vector-icons';
import { Dropdown } from '../components/Dropdown';
import { CurrencyInput } from '../components/CurrencyInput';
import { DatePicker } from '../components/DatePicker';

interface NewTransactionScreenProps extends NavigationStackScreenProps { };

const CURRENCY_PAIRS = [
  { label: 'EUR USD', value: 'EUR/USD' },
  { label: 'EUR GBP', value: 'EUR/GBP' },
  { label: 'GBP USD', value: 'GBP/USD' },
];

const CURRENCY_ACTIONS = {
  'EUR/USD': [
    { label: 'Buy EUR/Sell USD', value: 'EUR/USD' },
    { label: 'Sell EUR/Buy USD', value: 'USD/EUR' },
  ],
  'EUR/GBP': [
    { label: 'Buy EUR/Sell GBP', value: 'EUR/GBP' },
    { label: 'Sell EUR/Buy GBP', value: 'GBP/EUR' },
  ],
  'GBP/USD': [
    { label: 'Buy GBP/Sell USD', value: 'GBP/USD' },
    { label: 'Sell GBP/Buy USD', value: 'USD/GBP' },
  ]
};

const SYMBOL_TABLE = {
  'EUR': '€',
  'GBP': '£',
  'USD': '$'
};


export default function NewTransactionScreen(props: NewTransactionScreenProps) {
  const [currencyPair, setCurrencyPair] = useState(CURRENCY_PAIRS[0].value);
  const [currencyAction, setCurrencyAction] = useState(CURRENCY_ACTIONS[currencyPair][0].value);
  const [buyVal, setBuyVal] = useState('');
  const [sellVal, setSellVal] = useState('');
  const [expireDate, setExpireDate] = useState(null);

  const buy = currencyAction === currencyPair;
  const [cur1, cur2] = currencyAction.split('/');

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TouchableOpacity style={{ padding: 16 }} onPress={
          () => props.navigation.pop()
        }>
          <MaterialIcons name='close' size={24} />
        </TouchableOpacity>
        <Text style={{
          ...text.hAlt,
          padding: 16
        }}>New transaction</Text>
      </View>

      <View style={{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}>
        <View>
          <Dropdown
            activeValue={currencyPair}
            values={CURRENCY_PAIRS}
            onValueChange={(value, index) => {
              setCurrencyPair(value);
              setCurrencyAction(CURRENCY_ACTIONS[value][0].value);
            }}
            containerStyle={{
              borderBottomColor: '#BBBBBB',
              borderBottomWidth: 1,
              flex: 0,
              position: 'relative',
              flexDirection: 'row',
            }}
            style={{
              paddingVertical: 18,
              paddingLeft: 12,
              paddingRight: 48,
              ...text.regular
            }}
            textItemStyle={{
              padding: 10
            }}
          />
        </View>
        <View>
          <Dropdown
            activeValue={currencyAction}
            values={CURRENCY_ACTIONS[currencyPair]}
            onValueChange={(value, index) => setCurrencyAction(value)}
            containerStyle={{
              borderBottomColor: '#BBBBBB',
              borderBottomWidth: 1,
              flex: 0,
              position: 'relative',
              flexDirection: 'row',
            }}
            style={{
              paddingVertical: 18,
              paddingLeft: 12,
              paddingRight: 28,
              ...text.regular
            }}
            textItemStyle={{
              padding: 10
            }}
          />
        </View>
      </View>

      <View style={{
        padding: 16
      }}>
        <CurrencyInput
          type={buy ? 'Buy' : 'Sell'}
          currencySymbol={SYMBOL_TABLE[cur1]}
          value={buyVal}
          onChange={
            (text, rawText) => {
              setBuyVal(text);
            }
          }
        />
      </View>

      <View style={{
        padding: 16
      }}>
        <CurrencyInput
          type={!buy ? 'Buy' : 'Sell'}
          currencySymbol={SYMBOL_TABLE[cur2]}
          value={sellVal}
          onChange={
            (text, rawText) => {
              setSellVal(text);
            }
          }
          disabled
        />
      </View>

      <View style={{
        padding: 16
      }}>
        <DatePicker date={expireDate} onChange={(d) => setExpireDate(d)} />
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
});