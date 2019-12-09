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
import { UIPicker } from '../components/Picker';

interface NewOrderScreenProps extends NavigationStackScreenProps { };

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

const ORDER_TYPES = [
  { label: 'Order type', value: 'default' },
  { label: 'Limit', value: 'Limit' },
  { label: 'Stoploss', value: 'Stoploss' }
];

interface IformState {
  currencyPair: 'EUR/USD' | 'EUR/GBP' | 'GBP/USD' | 'Currency pair';
  currencyAction: 'EUR/USD' | 'USD/EUR' | 'EUR/GBP' | 'GBP/EUR' | 'GBP/USD' | 'USD/GBP' | 'Action';
  buyVal: string;
  buyValRaw: string;
  startDate: null | Date;
  accountType: string;
  exchangeRate: string;
  exchangeRateRaw: string;
  orderType: 'default' | 'Limit' | 'Stoploss';
}


export default function NewOrderScreen(props: NewOrderScreenProps) {
  const [formState, setFormState] = useState<IformState>({
    currencyPair: 'Currency pair',
    currencyAction: 'Action',
    buyVal: '',
    buyValRaw: '',
    startDate: null,
    accountType: 'EUR',
    exchangeRate: '',
    exchangeRateRaw: '',
    orderType: 'default'
  });

  const buy = formState.currencyAction === formState.currencyPair;
  // TODO: also check if selected cur pair & action
  const isSelected = formState.currencyPair !== 'Currency pair';
  const orderEnabled = formState.buyVal !== '' && formState.startDate && isSelected && formState.exchangeRate !== '' && formState.orderType !== 'default';
  const [cur1, cur2] = formState.currencyPair.split('/');
  const [sellVal, setSellVal] = useState('');

  function getSetSellVal() {
    const bvr = parseFloat(formState.buyValRaw);
    const rtr = parseFloat(formState.exchangeRateRaw);
    let calcVal = '';
    if (rtr !== 0 && bvr !== 0 && !isNaN(rtr) && !isNaN(bvr)) {
      calcVal = (buy ? (bvr * rtr) : (bvr / rtr)).toFixed(2);
    }
    setSellVal(calcVal);
  }

  useEffect(() => {

    getSetSellVal();

  }, [formState])


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
        }}>New Order</Text>
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
              setFormState({ ...formState, currencyPair: value, currencyAction: CURRENCY_ACTIONS[value][0].value })
            }}
          />
        </View>
        <View>
          <UIDropdown
            activeValue={formState.currencyAction}
            values={isSelected ? CURRENCY_ACTIONS[formState.currencyPair] : [{ label: 'Action', value: 'Action' }]}
            onValueChange={(value: IformState['currencyAction'], index) => {
              setFormState({ ...formState, currencyAction: value });
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
              setFormState({ ...formState, buyVal: text, buyValRaw: rawText })
            }
          }
          disabled={!isSelected}
        />
      </View>

      {/* Rate input (TODO: make RateInput component) */}
      <View style={{
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}>
        <CurrencyInput
          color='#F7F7F7'
          type={'Rate'}
          value={formState.exchangeRate}
          onChange={
            (text, rawText) => {
              setFormState({ ...formState, exchangeRate: text, exchangeRateRaw: rawText })
            }
          }
          disabled={!isSelected}
        />
      </View>

      <View style={{
        paddingHorizontal: 16
      }}>
        <CurrencyInput
          type={!buy ? 'Buy' : 'Sell'}
          currencySymbol={SYMBOL_TABLE[cur2]}
          value={sellVal}
          onChange={() => { }}
          disabled
        />
      </View>

      <View style={{
        padding: 16
      }}>
        <UIPicker
          selectedValue={formState.orderType}
          onValueChange={(val) => setFormState({ ...formState, orderType: val })}
          items={ORDER_TYPES}
        />
      </View>

      <View style={{
        padding: 16
      }}>
        <DatePicker mode='datetime' date={formState.startDate} onChange={(d) => setFormState({ ...formState, startDate: d })} text='Start date' />
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
        <UIBtn type='primary' title='Place order' size='lg' style={{
          margin: 16,
          marginLeft: 8
        }} onPress={() => {
          // perform buy action
          // navigate to receipt page
          setFormState({ ...formState, exchangeRate: '', buyVal: '', startDate: null, orderType: 'default' });
          setSellVal('');
          props.navigation.push('Receipt', {
            data: {
              ...formState
            },
            buttonText: 'New order'
          });
        }} disabled={!orderEnabled} />
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
