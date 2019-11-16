import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UIStatus } from '../components/Status';
import { text } from '../styles';

export default function DashboardScreen() {

  return (
    <View style={styles.container}>
      <Text style={[
        text.h1,
        text.leftTitle
      ]}>Dashboard</Text>

      <UIStatus status='live' text='Live rates. Update: '
        countdown={30} onCountdownEnd={() => {
          console.log('Update rates here.');
        }}
        infinite
      />
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