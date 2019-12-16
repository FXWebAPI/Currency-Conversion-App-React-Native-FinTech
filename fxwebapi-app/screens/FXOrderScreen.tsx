import React, { useState, useEffect } from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { text, colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { UIAddRound, UIBtn } from '../components/Buttons';
import { FilterList } from '../components/FilterList';
import { TransactionItem } from '../components/TransactionItem';

interface FXOrderScreenProps extends NavigationStackScreenProps { };

export default function FXOrderScreen(props: FXOrderScreenProps) {
  const [showActiveOrders, setShowActiveOrders] = useState(5);
  const [showOrders, setShowOrders] = useState(5);
  const [executedOrders, setExecutedOrders] = useState(true);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    let res = await fetch('https://demo.fxcib.com/api/FXWebAPI/OrderBlotter', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "requestId": "5n7658m6v45c4v",
        "customerCode": "SYNNETRA.HTML.TEST",
        "request": {
          "key": "X445Acg7tkxsy7HfZKHgDUKxKW9g4RWazM9NtjWTwdU6nxtQGKgKTMNmSdDcPECHGpvz3PnNVDH4H2Mq"
        },
        "filters": {}
      })
    });
    let resJSON = await res.json();
    setOrders(resJSON);
    setLoading(false);
  }

  useEffect(() => {
    getOrders();
  }, []);

  const activeOrders = orders.filter(({ Status }) => Status === 'Active');
  const exOrders = orders.filter(({ Status }) => Status === 'Filled');
  const canOrders = orders.filter(({ Status }) => Status === 'Cancelled');
  
  return (
    <ScrollView style={{
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
        }}>FX order</Text>
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
          () => props.navigation.push('NewOrder')
        } shadow />
        <Text style={{
          ...text.p,
          fontSize: 16,
          paddingTop: 16
        }}>New order</Text>
      </View>

      <View style={{
        flex: 1,
        backgroundColor: '#FFF',
        alignContent: 'center'
      }}>
        {loading ?
          <Text style={{
            ...text.p,
            fontSize: 16,
            textAlign: 'center'
          }}>Loading transactions...</Text>
          :
          <>
            <FilterList title='Last transactions' items={
              activeOrders.slice(-showActiveOrders).map((trans, i) =>
                <TransactionItem
                  {...trans}
                  key={i}
                  onPress={() => props.navigation.push('OrderInfo', { data: { ...trans, title: `${trans.Status} order ${trans.OrderId}`, date: trans.SettlementDate } })}
                />
              )
            }
            />
            {activeOrders.length > 5 ? <UIBtn type='secondary' title={`See ${showActiveOrders ? 'all' : 'less'}`}
              size='lg' style={{ margin: 16, alignSelf: 'center' }}
              onPress={() => setShowActiveOrders(!showActiveOrders ? 5 : 0)}
            /> : null}

            <FilterList
              title='Orders history'
              items={
                (executedOrders ? exOrders : canOrders).slice(-showOrders).map((trans, i) =>
                  <TransactionItem
                    {...trans}
                    key={i}
                    onPress={() => props.navigation.push('OrderInfo', { data: { ...trans, title: `${trans.Status} order ${trans.OrderId}`, date: trans.SettlementDate } })}
                  />
                )
              }
              style={{
                borderTopColor: '#DCDCDC',
                borderTopWidth: 1,
              }}
              toggle={{
                left: 'Executed orders',
                right: 'Canceled orders',
                selected: executedOrders,
                onPress: (val: boolean) => setExecutedOrders(val)
              }}
            />
            {exOrders.length > 5 || canOrders.length > 5 ?
            <UIBtn type='secondary' title={`See ${showOrders ? 'all' : 'less'}`}
              size='lg' style={{ margin: 16, alignSelf: 'center' }}
              onPress={() => setShowOrders(!showOrders ? 5 : 0)}
            />
            : null}
          </>
        }
      </View>

    </ScrollView>
  );
};