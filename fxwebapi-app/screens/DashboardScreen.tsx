import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Chart from '../chart/Chart';
import { text } from '../styles';

export default function DashboardScreen() {
  const [ data, setData ] = useState([ 
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);
  useEffect(() => {
    const testDataChange = () => {
      let data2 = [
        { genre: 'A', sold: 275 },
        { genre: 'B', sold: 115 },
        { genre: 'C', sold: 120 },
        { genre: 'D', sold: 350 },
        { genre: 'Other', sold: 200 },
        { genre: 'E', sold: 122 },
      ];
      setTimeout(() => setData(data2), 2000);
    }

    testDataChange();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[
        text.h1,
        text.leftTitle
      ]}>Dashboard</Text>
      <Chart style={{
        width: Dimensions.get('window').width,
        height: 300
      }} data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});