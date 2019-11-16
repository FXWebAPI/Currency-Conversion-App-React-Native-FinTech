import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { text } from '../styles';

const Chart = () => {
  const [ html, setHTML ] = useState(null);
  useEffect(() => {
    const loadHTML = async () => {
      let HTMLFile = Asset.fromModule(require('../chart/chart.html'));
      
      if (!HTMLFile.localUri) {
        await Asset.loadAsync(require('../chart/chart.html'));
        HTMLFile = Asset.fromModule(require('../chart/chart.html'));
      }

      setHTML(HTMLFile.localUri);
    }

    loadHTML();
  }, []);
  return (
    <WebView
      source={
        Platform.OS === 'android' ?
        { uri: html } : require('../chart/chart.html')}
      originWhitelist={["*"]}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess={true}
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