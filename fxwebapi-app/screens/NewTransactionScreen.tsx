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
import { useInterval } from '../utils';
import { ws } from '../ws';

interface NewTransactionScreenProps extends NavigationStackScreenProps { };

const CURRENCY_PAIRS = [
  { label: 'EUR USD', value: 'EUR/USD' },
  { label: 'EUR GBP', value: 'EUR/GBP' },
  { label: 'GBP USD', value: 'GBP/USD' },
] as const;

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
} as const;

const SYMBOL_TABLE = {
  'EUR': '€',
  'GBP': '£',
  'USD': '$'
};

const ACCOUNTS_MOCK = [
  { label: 'To Euro Account', value: 'EUR' },
  { label: 'To USD Account', value: 'USD' },
];

interface IformState {
  currencyPair: 'EUR/USD' | 'EUR/GBP' | 'GBP/USD' | 'Currency pair';
  currencyAction: 'EUR/USD' | 'USD/EUR' | 'EUR/GBP' | 'GBP/EUR' | 'GBP/USD' | 'USD/GBP' | 'Action';
  buyVal: string;
  sellVal: string;
  buyValRaw: string;
  expireDate: null | Date;
  accountType: string;
  exchangeRate: null | number;
}


export default function NewTransactionScreen(props: NewTransactionScreenProps) {
  const [formState, setFormState] = useState<IformState>({
    currencyPair: 'Currency pair',
    currencyAction: 'Action',
    buyVal: '',
    sellVal: '',
    buyValRaw: '',
    expireDate: null,
    accountType: 'EUR',
    exchangeRate: null
  });
  const [cancelTime, setCancelTime] = useState(45);
  const [getQuote, setGetQuote] = useState(false);
  const [changed, setChanged] = useState(false);

  const buy = formState.currencyAction === formState.currencyPair;
  // TODO: also check if selected cur pair & action
  const isSelected = formState.currencyPair !== 'Currency pair';
  const quoteEnabled = formState.buyVal !== '' && formState.expireDate && isSelected;
  const [cur1, cur2] = formState.currencyPair.split('/');

  const getData = (ev: MessageEvent) => {
    let data = JSON.parse(ev.data);
    console.log(formState);
    if (data.IsExecutionRejection) ws.reopen();
    if (data.IsQuote) {
      console.log('equal');
      setFormState({
        ...formState,
        exchangeRate: data.offer,
        sellVal: (data.offer * parseFloat(formState.buyValRaw)).toFixed(2)
      });
    }
  }

  if (getQuote && changed) {
    ws.askCurrencyData({
      amount: parseFloat(formState.buyValRaw),
      pair: formState.currencyPair,
      side: formState.currencyAction === formState.currencyPair ? 1 : 2
    });
    setChanged(false);
  }

  useEffect(() => {
    function initFunc() {
      ws.onMessage(getData);
    }

    initFunc();

    return () => {
      ws.onMessageDestroy(getData);
    }
  }, [formState]);

  if (cancelTime <= 0) {
    setFormState({
      ...formState,
      exchangeRate: null,
      sellVal: '',
    });
    setCancelTime(45);
  }

  useInterval(() => {
    setCancelTime(cancelTime - 1);
  }, cancelTime === - 1 || !quoteEnabled || !formState.exchangeRate ? null : 1000);

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
            activeValue={formState.currencyPair}
            values={CURRENCY_PAIRS}
            onValueChange={(value: IformState['currencyPair'], index) => {
              setFormState({ ...formState, currencyPair: value, currencyAction: CURRENCY_ACTIONS[value][0].value });
              setChanged(true);
            }}
          />
        </View>
        <View>
          <UIDropdown
            activeValue={formState.currencyAction}
            values={isSelected ? CURRENCY_ACTIONS[formState.currencyPair] : [{ label: 'Action', value: 'Action' }]}
            onValueChange={(value: IformState['currencyAction'], index) => {
              setFormState({ ...formState, currencyAction: value });
              setChanged(true);
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
          value={formState.buyVal}
          onChange={
            (text, rawText) => {
              setFormState({ ...formState, buyVal: text, buyValRaw: rawText });
              setChanged(true);
            }
          }
          disabled={!isSelected}
        />
      </View>

      {formState.exchangeRate ?
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
          }}>{formState.exchangeRate}</Text>
        </View>

        : null}

      <View style={{
        paddingHorizontal: 16
      }}>
        <CurrencyInput
          type={!buy ? 'Buy' : 'Sell'}
          currencySymbol={SYMBOL_TABLE[cur2]}
          value={formState.sellVal}
          onChange={
            (text, rawText) => {
              setFormState({ ...formState, sellVal: text })
            }
          }
          disabled
        />
      </View>

      <View style={{
        padding: 16
      }}>
        <DatePicker date={formState.expireDate} onChange={(d) => setFormState({ ...formState, expireDate: d })} />
      </View>

      {/* <View>
        <Dropdown
          activeValue={formState.accountType}
          values={ACCOUNTS_MOCK}
          onValueChange={(value, index) => setFormState({...formState, accountType: value})}
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
      </View> */}

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
        {!formState.exchangeRate && !getQuote ? <UIBtn title='Get quote' size='lg' type='primary' disabled={!quoteEnabled} style={{
          flex: 1,
          margin: 16,
          alignSelf: 'stretch',
          width: 'auto'
        }} onPress={() => {
          setGetQuote(true);
        }} /> :
          <>
            <UIBtn type='secondary' title={`Cancel ${cancelTime}s`} size='lg' style={{
              margin: 16,
              marginRight: 8
            }} onPress={() => {
              setFormState({ ...formState, exchangeRate: null, sellVal: '' });
              setGetQuote(false);
              setCancelTime(45);
            }} />
            <UIBtn type='primary' title='Buy EUR' size='lg' style={{
              margin: 16,
              marginLeft: 8
            }} onPress={() => {
              // perform buy action
              // navigate to receipt page
              setFormState({ ...formState, exchangeRate: null, sellVal: '' });
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
