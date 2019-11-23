import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { UIStatus } from '../components/Status';
import { UIDashboardCard } from '../components/DashboardCard';
import { text, colors } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { UIAddRound } from '../components/Buttons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import Chart from '../chart/Chart';
import { ws, BaseChartData } from '../ws';

interface FXChartScreenProps extends NavigationStackScreenProps { };

export default function FXChartScreen(props: FXChartScreenProps) {
  const [ chartArgs, setChartArgs ] = useState<BaseChartData>({currencyPair: 'EUR/USD', granularity: 'H1'})
  const [ data, setData ] = useState([]);

  const getData = (ev: MessageEvent) => {
    console.log('msg');
    setData(JSON.parse(ev.data).candles);
  }

  useEffect(() => {
    function initFunc() {
      ws.onMessage(getData);
      ws.askChartData(chartArgs);
    }

    initFunc();

    return () => {
      ws.onMessageDestroy(getData);
    }
  }, []);

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
        paddingBottom: 70,
      }}></View>
      <Chart style={{
        flex: 1,
        alignSelf: 'stretch',
      }} chartScript='lineGraph' data={data}/>
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