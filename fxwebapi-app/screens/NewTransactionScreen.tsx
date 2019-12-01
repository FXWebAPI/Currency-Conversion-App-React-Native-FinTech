import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { text, colors, shadow } from '../styles';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import Icon from '../components/Icon';
import { MaterialIcons } from '@expo/vector-icons';
import { Dropdown, UIDropdown } from '../components/Dropdown';
import { CurrencyInput } from '../components/CurrencyInput';
import { DatePicker } from '../components/DatePicker';
import { UIBtn } from '../components/Buttons';

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

const ACCOUNTS_MOCK = [
  { label: 'To Euro Account', value: 'EUR' },
  { label: 'To USD Account', value: 'USD' },
];


export default function NewTransactionScreen(props: NewTransactionScreenProps) {
  const [currencyPair, setCurrencyPair] = useState(CURRENCY_PAIRS[0].value);
  const [currencyAction, setCurrencyAction] = useState(CURRENCY_ACTIONS[currencyPair][0].value);
  const [buyVal, setBuyVal] = useState('');
  const [sellVal, setSellVal] = useState('');
  const [buyValRaw, setBuyValRaw] = useState('');
  const [expireDate, setExpireDate] = useState(null);
  const [accountType, setAccountType] = useState(ACCOUNTS_MOCK[0].value);
  const [exchangeRate, setExchangeRate] = useState(null);

  const buy = currencyAction === currencyPair;
  // TODO: also check if selected cur pair & action
  const quoteEnabled = buyVal !== '' && expireDate;
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
          <UIDropdown
            activeValue={currencyPair}
            values={CURRENCY_PAIRS}
            onValueChange={(value, index) => {
              setCurrencyPair(value);
              setCurrencyAction(CURRENCY_ACTIONS[value][0].value);
            }}
          />
        </View>
        <View>
          <UIDropdown
            activeValue={currencyAction}
            values={CURRENCY_ACTIONS[currencyPair]}
            onValueChange={(value, index) => setCurrencyAction(value)}
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
              setBuyValRaw(rawText);
            }
          }
        />
      </View>

      {exchangeRate ?
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 28,
          paddingBottom: 16
        }}>
          <Text style={{
            color: colors.btnPrimary,
            fontSize: 16,
            fontFamily: 'Roboto'
          }}>I {buy ? 'Buy' : 'Sell'} {cur1} at</Text>
          <Text style={{
            color: colors.btnPrimary,
            fontSize: 34,
            fontFamily: 'Pangram'
          }}>{exchangeRate}</Text>
        </View>

        : null}

      <View style={{
        paddingHorizontal: 16
      }}>
        <CurrencyInput
          type={!buy ? 'Buy' : 'Sell'}
          currencySymbol={SYMBOL_TABLE[cur2]}
          value={sellVal}
          onChange={
            (text, rawText) => {
              setSellVal(text);
              setBuyValRaw(rawText);
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

      <View>
        <Dropdown
          activeValue={accountType}
          values={ACCOUNTS_MOCK}
          onValueChange={(value, index) => setAccountType(value)}
          containerStyle={{
            borderBottomColor: '#BBBBBB',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'relative',
            paddingHorizontal: 12,
            marginHorizontal: 16
          }}
          style={{
            paddingVertical: 18,
            ...text.regular
          }}
          textItemStyle={{
            padding: 10
          }}
        />
      </View>

      <View style={{
        position: 'absolute',
        bottom: 0,
        height: 80,
        width: '100%',
        backgroundColor: 'white',
        flex: 0,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        ...shadow.base,
        marginTop: 4
      }}>
        {!exchangeRate ? <UIBtn title='Get quote' size='lg' type='primary' disabled={!quoteEnabled} style={{
          flex: 1,
          margin: 16,
          alignSelf: 'stretch',
          width: 'auto'
        }} onPress={() => {
          // get exchange rate from api
          const exrate = 1.13967;
          const bvr = parseFloat(buyValRaw);
          const calcVal = (buy ? (bvr * exrate) : (bvr / exrate)).toFixed(2);
          setExchangeRate(exrate);
          setSellVal(calcVal + '');
        }} /> :
          <>
            <UIBtn type='secondary' title='Cancel 45s' size='lg' style={{
              margin: 16,
              marginRight: 8
            }} onPress={() => setExchangeRate('')} />
            <UIBtn type='primary' title='Buy EUR' size='lg' style={{
              margin: 16,
              marginLeft: 8
            }} onPress={() => {
              // perform buy action
              // navigate to receipt page
              props.navigation.push('Receipt', {
                data: {
                  'ID': '29656020',
                  'Company Code': 'Synnetra',
                  'Settlement Date': '16.12.2019',
                  'Action': 'Buy EUR / Sell USD',
                  'Currency Pair': 'EUR USD',
                  'Notional amount': '250,00',
                  'Opposite amount': '281,01',
                  'Quote': '1.13967',
                  'User ID': 'John Doe',
                  'Execution Time Stamp': '16.12.2019 | 06:20:19',
                },
                buttonText: 'New transaction'
              });
            }} />
          </>
        }
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
