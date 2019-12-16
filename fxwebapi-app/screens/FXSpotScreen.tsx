import React, { useState, useEffect } from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, Text } from "react-native";
import { text, colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UIAddRound } from '../components/Buttons';
import { FilterList } from '../components/FilterList';
import { TransactionItem } from '../components/TransactionItem';

interface FXSpotScreenProps extends NavigationStackScreenProps { };

const DISPLAY_TRANSACTIONS_MAX = 50;

export default function FXSpotScreen(props: FXSpotScreenProps) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTransactions = async () => {
    let res = await fetch('https://demo.fxcib.com/api/FXWebAPI/DealBlotter', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "requestId": "5n7658m6v45c4v",
        "customerCode": "SYNNETRA.HTML.TEST",
        "request":
          { "key": "X445Acg7tkxsy7HfZKHgDUKxKW9g4RWazM9NtjWTwdU6nxtQGKgKTMNmSdDcPECHGpvz3PnNVDH4H2Mq" },
        "filters": {}
      })
    });
    let resJSON = await res.json();
    setTransactions(resJSON);
    setLoading(false);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <View style={{
      backgroundColor: '#EFF2F5',
      flex: 1,
    }}>
      {/* Header */}
      <View style={{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-between'
      }}>
        <Text style={{
          ...text.hAlt
        }}>FX Spot / Forward</Text>
        <TouchableOpacity style={{
          alignSelf: 'flex-end'
        }}>
          <MaterialIcons name='search' size={24} color={colors.darkIcons} />
        </TouchableOpacity>
      </View>

      <View style={{
        flex: 0,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 40,
      }}>
        <UIAddRound size={48} fill={colors.btnPrimary} color={colors.btnText} onPress={
          () => props.navigation.push('Transaction')
        } shadow />
        <Text style={{
          ...text.p,
          fontSize: 16,
          paddingTop: 16
        }}>New transaction</Text>
      </View>

      {loading ?
        <Text style={{
          ...text.p,
          fontSize: 16,
          textAlign: 'center'
        }}>Loading transactions...</Text>
        :
        transactions.length > 0 ?
          <FilterList title='Last transactions' items={
            transactions.slice(-DISPLAY_TRANSACTIONS_MAX).map((trans, i) =>
              <TransactionItem
                {...trans}
                key={i}
                onPress={() => props.navigation.push('OrderInfo', { data: { ...trans, title: `${trans.Status} order ${trans.OrderId}`, date: trans.SettlementDate } })}
              />
            )
          } /> :
          <Text style={{
            ...text.p,
            fontSize: 16,
            textAlign: 'center'
          }}>No transactions to show.</Text>
      }
    </View>
  );
};