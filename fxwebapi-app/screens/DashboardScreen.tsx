import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { text } from '../styles';

const Chart = () => {
  const [ html, setHTML ] = useState(null);
  useEffect(() => {
    const loadHTML = async () => {
      let HTMLFile = Asset.fromModule(require('../chart/index.html'));
      
      if (!HTMLFile.localUri) {
        await Asset.loadAsync(require('../chart/index.html'));
        HTMLFile = Asset.fromModule(require('../chart/index.html'));
      }

      setHTML(HTMLFile.localUri);
    }

    loadHTML();
  }, []);
  return (
    <WebView
      source={
        Platform.OS === 'android' ?
        { uri: html } : require('../chart/index.html')}
      originWhitelist={["*"]}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess={true}
      injectedJavaScript={`
      const chart = new F2.Chart({
        id: 'myChart', // pass node's id
        width: 375,
        height: 260,
        pixelRatio: window.devicePixelRatio
      });
      const data = [ 
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ];
      
      chart.source(data); // load the data
      chart.interval().position('genre*sold').color('genre');
      chart.render();
      `}
      style={{
        width: Dimensions.get('window').width,
        height: 400
      }}
    />
  );
};

export default function DashboardScreen() {

  return (
    <View style={styles.container}>
      <Text style={[
        text.h1,
        text.leftTitle
      ]}>Dashboard</Text>
      <Chart />
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