import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { text } from '../styles';

export default function DashboardScreen() {

  return (
    <View style={styles.container}>
      <Text style={[
        text.h1,
        text.leftTitle
      ]}>Dashboard</Text>
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