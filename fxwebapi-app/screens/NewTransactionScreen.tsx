import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { text, colors } from '../styles';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import Icon from '../components/Icon';
import { MaterialIcons } from '@expo/vector-icons';
import { Dropdown } from '../components/Dropdown';
import { CurrencyInput } from '../components/CurrencyInput';

interface NewTransactionScreenProps extends NavigationStackScreenProps { };

const CURRENCY_PAIRS = [
  { label: 'EUR USD', value: 'EUR/USD' },
  { label: 'EUR GBP', value: 'EUR/GBP' },
  { label: 'GBP USD', value: 'GBP/USD' },
];

const CURRENCY_ACTIONS = [
  { label: 'Buy EUR/Sell USD', value: 'Buy/Sell' },
  { label: 'Sell EUR/Buy USD', value: 'Sell/Buy' },
]

export default function NewTransactionScreen(props: NewTransactionScreenProps) {
  const [currencyPair, setCurrencyPair] = useState(CURRENCY_PAIRS[0].value);
  const [currencyAction, setCurrencyAction] = useState(CURRENCY_ACTIONS[0].value);
  const [buyVal, setBuyVal] = useState('');
  const [sellVal, setSellVal] = useState('');

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
            onValueChange={(value, index) => setCurrencyPair(value)}
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
            values={CURRENCY_ACTIONS}
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
          type='Buy'
          currencySymbol='€'
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
          type='Sell'
          currencySymbol='€'
          value={sellVal}
          onChange={
            (text, rawText) => {
              setSellVal(text);
            }
          }
        />
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