import React, { useState, useEffect } from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { text, colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { UIAddRound, UIBtn } from '../components/Buttons';
import { FilterList } from '../components/FilterList';
import { TransactionItem } from '../components/TransactionItem';
import { UIPagination } from '../components/Pagination';

interface DealBlotterScreenProps extends NavigationStackScreenProps { };

export default function DealBlotterScreen(props: DealBlotterScreenProps) {
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState('Deal Blotter');
  const [exec, setExec] = useState(true);
  const [transactionsPre, setTransactions] = useState([]);

  const OPTIONS = {
    'Deal Blotter': {
      CBTitle: 'Export to Excel',
      onCBClick: () => console.log('export to excel here')
    },
    'Orders history': {
      toggle: {
        left: 'Executed orders',
        right: 'Canceled orders',
        selected: exec,
        onPress: (val: boolean) => setExec(val)
      }
    },
    'Active orders': {}
  };


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
    setTransactions(resJSON);
  }

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
  }

  const getData = () => {
    if (tab === 'Deal Blotter') getTransactions();
    else getOrders();
    setPage(0);
  }

  useEffect(() => {
    getData();
  }, [tab]);

  let transactions = [];
  if (tab === 'Deal Blotter') transactions = transactionsPre;
  else if (tab === 'Active orders') transactions = transactionsPre.filter(({ Status }) => Status === 'Active');
  else if (exec) transactions = transactionsPre.filter(({ Status }) => Status === 'Filled');
  else transactions = transactionsPre.filter(({ Status }) => Status === 'Cancelled');



  return (
    <ScrollView style={{
      backgroundColor: '#FFF',
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
        }}>Deal blotter</Text>
        <TouchableOpacity style={{
          alignSelf: 'flex-end'
        }}>
          <MaterialIcons name='search' size={24} color={colors.darkIcons} />
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
      }}>
        <TouchableOpacity onPress={() => setTab('Deal Blotter')} style={{
          borderBottomColor: tab === 'Deal Blotter' ? colors.btnPrimary : colors.inactiveIcons,
          borderBottomWidth: tab === 'Deal Blotter' ? 1 : 0.5,
          paddingVertical: 16,
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            ...text.p,
            fontWeight: tab === 'Deal Blotter' ? '500' : 'normal'
          }}>Deal Blotter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('Orders history')} style={{
          borderBottomColor: tab === 'Orders history' ? colors.btnPrimary : colors.inactiveIcons,
          borderBottomWidth: tab === 'Orders history' ? 1 : 0.5,
          paddingVertical: 16,
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            ...text.p,
            fontWeight: tab === 'Orders history' ? '500' : 'normal'
          }}>Orders history</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('Active orders')} style={{
          borderBottomColor: tab === 'Active orders' ? colors.btnPrimary : colors.inactiveIcons,
          borderBottomWidth: tab === 'Active orders' ? 1 : 0.5,
          paddingVertical: 16,
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{
            ...text.p,
            fontWeight: tab === 'Active orders' ? '500' : 'normal'
          }}>Active orders ({transactionsPre.filter(({ Status }) => Status === 'Active').length})</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flex: 1,
        backgroundColor: '#FFF',
        alignContent: 'center'
      }}>
        <FilterList
          title='Filters'
          items={
            transactions.slice(page * 10, page * 10 + 10).map((trans, i) =>
              <TransactionItem
                {...trans}
                key={i}
                onPress={() => props.navigation.push('OrderInfo', { data: { ...trans, title: `${trans.Status} order ${trans.OrderId}`, date: trans.SettlementDate } })}
              />
            )
          }
          {...OPTIONS[tab]}
        />
        <View style={{
          paddingHorizontal: 22,
          paddingTop: 20,
          paddingBottom: 36,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <UIPagination currentPage={page} pagesMax={Math.floor(transactions.length / 10)} onPageChange={(p) => setPage(p)} />
        </View>
      </View>

    </ScrollView>
  );
};