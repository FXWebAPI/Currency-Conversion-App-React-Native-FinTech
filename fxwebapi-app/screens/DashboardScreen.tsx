import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function DashboardScreen() {

  return (
    <View style={styles.container}>
      <Text>ASDF</Text>
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