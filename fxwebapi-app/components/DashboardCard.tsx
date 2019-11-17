import React from 'react';
import { TouchableOpacity, GestureResponderEvent, Text, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, text, dashboardCard } from '../styles';

interface UIDashboardCardProps {
  onPressSell?: (event: GestureResponderEvent) => void;
  onPressBuy?: (event: GestureResponderEvent) => void;
  pair: [string, string];
  buy: string;
  sell: string;
}

const UIDashboardCard = (props: UIDashboardCardProps) => {
  return (
    <View style={{
      flex: 0,
      flexDirection: 'column',
      alignSelf: 'center',
      width: 328,
      maxWidth: Dimensions.get('window').width,
      height: 160,
      padding: 24,
      backgroundColor: colors.btnText,
      borderRadius: 4,
      shadowColor: 'black',
      shadowOpacity: 0.29,
      shadowOffset: { height: 0, width: 2 },
      shadowRadius: 12,
      elevation: 6,
      marginBottom: 16,
    }}>
      <Text style={{
        ...text.h2
      }}>{props.pair[0]} {props.pair[1]}</Text>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
      }}>

        <TouchableOpacity style={{
          backgroundColor: '#E4E4E4',
          ...dashboardCard.btn
        }}>

          <Text style={{
            ...text.p
          }}>Sell</Text>

          <View style={{
            ...dashboardCard.btnText
          }}>
            <MaterialIcons name='keyboard-arrow-down' size={20} color={colors.textPrimary} />
            <Text style={{
              ...text.p,
              fontSize: 16,
              textAlign: 'right',
            }}>
              {props.sell}
            </Text>
          </View>

        </TouchableOpacity>

        <TouchableOpacity style={{
          backgroundColor: colors.btnPrimary,
          ...dashboardCard.btn
        }}>

          <Text style={{
            ...text.p,
            color: colors.btnText
          }}>Buy</Text>

          <View style={{
            ...dashboardCard.btnText
          }}>
            <MaterialIcons name='keyboard-arrow-up' size={20} color={colors.btnText} />
            <Text style={{
              ...text.p,
              fontSize: 16,
              color: colors.btnText,
              textAlign: 'right',
            }}>
              {props.buy}
            </Text>
          </View>

        </TouchableOpacity>
      </View>
    </View >
  )
}

export { UIDashboardCard };
