import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { text, colors } from '../styles';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import Chart from '../chart/Chart';
import { ws, BaseChartData } from '../ws';
import { GranularityButtons } from '../components/GranularityButtons';
import { UICurrencyPicker } from '../components/CurrencyPicker';
import Icon from '../components/Icon';
import { MaterialIcons } from '@expo/vector-icons';

interface FXChartScreenProps extends NavigationStackScreenProps { };
type chartTypes = 'lineGraph' | 'candleChart';

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

const CHART_TYPES = [
  'lineGraph',
  'candleChart'
] as const;

const MAX_DATAPOINTS = 80;

export default function FXChartScreen(props: FXChartScreenProps) {
  const [chartArgs, setChartArgs] = useState<BaseChartData>({
    currencyPair: CURRENCY_PAIRS[0].value,
    granularity: GRANULARITY_VALUES[0].value
  });
  const [chartType, setChartType] = useState<chartTypes>(CHART_TYPES[0]);

  const [data, setData] = useState([]);

  const getData = (ev: MessageEvent) => {
    let chartData = JSON.parse(ev.data).candles;
    chartData = chartData.slice(-MAX_DATAPOINTS); // get only MAX_DATAPOINTS of data
    // format data for candlesticks
    chartData.forEach((obj) => {
      obj.range = [ obj.open, obj.close, obj.low, obj.high ];
      obj.trend = obj.open <= obj.close ? 0 : 1;
    });
    setData(chartData);
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
      }} chartScript={chartType} data={data} />
      <GranularityButtons
        values={GRANULARITY_VALUES}
        activeValue={chartArgs.granularity}
        onPress={(value) => setChartArgs({ ...chartArgs, granularity: value })}
      />
      <View style={{
        paddingVertical: 4,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'flex-end'
      }}>
        <TouchableOpacity style={{
          padding: 12
        }} onPress={() => setChartType(CHART_TYPES[0])}>
          <Icon name='linechart_icon' size={24}
            color={chartType === CHART_TYPES[0] ? colors.btnPrimary : colors.textPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{
          padding: 12
        }} onPress={() => setChartType(CHART_TYPES[1])}>
          <Icon name='candlechart_icon' size={24}
            color={chartType === CHART_TYPES[1] ? colors.btnPrimary : colors.textPrimary}
          />
        </TouchableOpacity>
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