import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { UIStatus } from '../components/Status';
import { UIDashboardCard } from '../components/DashboardCard';
import { text, colors } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { UIAddRound } from '../components/Buttons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationStackScreenProps } from 'react-navigation-stack';

interface DashboardScreenProps extends NavigationStackScreenProps {
}

export default function DashboardScreen(props: DashboardScreenProps) {
  const [addClicked, setAddClicked] = useState(false);

  return (
    <ScrollView style={styles.container}>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity style={{
          padding: 16
        }} onPress={
          () => props.navigation.push('FXChart')
        }>
          <MaterialIcons name='insert-chart' size={24} />
        </TouchableOpacity>
        <View style={{
          flex: 0,
          alignSelf: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <TouchableOpacity style={{
            padding: 16
          }}>
            <MaterialIcons name='search' size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            padding: 16
          }}>
            <MaterialIcons name='settings' size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        padding: 16,
      }}>
        <Text style={[
          text.h1,
          text.leftTitle,
          { paddingBottom: 24, paddingTop: 0 }
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
      </View>

      {addClicked ? <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.83)']}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          elevation: 7,
        }}
      >
      </LinearGradient> : null}

      <View style={{
        position: 'relative',
        elevation: 8,
        padding: 16,
        alignSelf: 'flex-end',
        flex: 1,
        alignItems: 'flex-end',
      }}>
        {addClicked ?
          <View style={{
            position: 'absolute',
            flex: 1,
            alignItems: 'flex-end',
            bottom: 64,
            right: 16,
          }}>
            <View style={{
              flex: 0,
              alignItems: 'center',
              flexDirection: 'row',
              paddingBottom: 16,
            }}>
              <Text style={{
                fontSize: 16,
                color: colors.btnText,
                paddingRight: 8,
              }}>New order</Text>
              <UIAddRound size={32} color={colors.darkIcons} fill={colors.btnText} />
            </View>
            <View style={{
              flex: 0,
              alignItems: 'center',
              flexDirection: 'row',
              paddingBottom: 16
            }}>
              <Text style={{
                fontSize: 16,
                color: colors.btnText,
                paddingRight: 8
              }}>New transaction</Text>
              <UIAddRound size={32} color={colors.darkIcons} fill={colors.btnText} />
            </View>
          </View> : null}
        <UIAddRound
          size={48}
          color={colors.btnText}
          fill={colors.btnPrimary}
          rotate={addClicked ? '45deg' : null}
          onPress={() => setAddClicked(!addClicked)}
        />
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
});