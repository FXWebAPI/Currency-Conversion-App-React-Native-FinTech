import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { text } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import Chart from '../chart/Chart';
import { ws, BaseChartData } from '../ws';
import { GranularityButtons } from '../components/GranularityButtons';
import { UICurrencyPicker } from '../components/CurrencyPicker';

interface FXChartScreenProps extends NavigationStackScreenProps { };

const GRANULARITY_VALUES = [
  { label: '1H', value: 'M1' },
  { label: '1D', value: 'H1' },
  { label: '1W', value: 'D' },
  { label: '1M', value: 'W' },
  { label: '1Y', value: 'M' },
] as const;

const CURRENCY_PAIRS = [
  { label: 'EUR USD', value: 'EUR/USD' },
  { label: 'EUR GBP', value: 'EUR/GBP' },
  { label: 'GBP USD', value: 'GBP/USD' },
  // { label: 'GBP EUR', value: 'GBP/EUR' },
  // { label: 'USD GBP', value: 'USD/GBP' },
  // { label: 'USD EUR', value: 'USD/EUR' },
] as const;

export default function FXChartScreen(props: FXChartScreenProps) {
  const [chartArgs, setChartArgs] = useState<BaseChartData>({
    currencyPair: CURRENCY_PAIRS[0].value,
    granularity: GRANULARITY_VALUES[0].value
  });

  const [data, setData] = useState([]);

  const getData = (ev: MessageEvent) => {
    console.log('msg');
    setData(JSON.parse(ev.data).candles);
  }

  useEffect(() => {
    function initFunc() {
      ws.onMessage(getData);
    }

    initFunc();

    return () => {
      ws.onMessageDestroy(getData);
    }
  }, []);

  useEffect(() => {
    ws.askChartData(chartArgs);
  }, [chartArgs]);

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
        }}>FX chart</Text>
      </View>

      {/* <View style={{
        paddingVertical: 23,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around'
      }}>
        <Text style={{
          ...text.bigTitle,
        }}>EUR USD</Text>
      </View> */}
      <View style={{
        paddingVertical: 23,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around'
      }}>
        <UICurrencyPicker
          values={CURRENCY_PAIRS}
          activeValue={chartArgs.currencyPair}
          onValueChange={(itemValue, _) => {
            setChartArgs({ ...chartArgs, currencyPair: itemValue })
          }}
        />
      </View>

      <Chart style={{
        flex: 1,
        alignSelf: 'stretch',
      }} chartScript='lineGraph' data={data} />
      <GranularityButtons
        values={GRANULARITY_VALUES}
        activeValue={chartArgs.granularity}
        onPress={(value) => setChartArgs({ ...chartArgs, granularity: value })}
      />
      <View style={{
        paddingTop: 112,
      }}></View>
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