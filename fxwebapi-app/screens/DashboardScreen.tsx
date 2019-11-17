import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { UIStatus } from '../components/Status';
import { UIDashboardCard } from '../components/DashboardCard';
import { text, colors } from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function DashboardScreen() {

  return (
    <ScrollView style={styles.container}>
      <Text style={[
        text.h1,
        text.leftTitle
      ]}>Dashboard</Text>

      <UIStatus status='live' text='Live rates. Update: '
        countdown={30} onCountdownEnd={() => {
          console.log('Update rates here.');
        }}
        infinite
        updating
      />
      <UIDashboardCard pair={['EUR', 'USD']}
        sell='1.1396'
        buy='1.1398'
      />
      <UIDashboardCard pair={['EUR', 'GBP']}
        sell='1.1396'
        buy='1.1398'
      />
      <UIDashboardCard pair={['GBP', 'USD']}
        sell='1.1396'
        buy='1.1398'
      />
      <TouchableOpacity style={{
        marginVertical: 16,
        backgroundColor: colors.btnPrimary,
        width: 48,
        height: 48,
        borderRadius: 100,
        alignSelf: 'flex-end',
      }}><MaterialIcons name='add' size={24} color={colors.btnText} style={{
        padding: 12
      }} /></TouchableOpacity>
      <View style={{
        padding: 10
      }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});