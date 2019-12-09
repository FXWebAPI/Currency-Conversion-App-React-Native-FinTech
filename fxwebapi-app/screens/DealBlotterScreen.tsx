import React, { useState } from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { text, colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { UIAddRound, UIBtn } from '../components/Buttons';
import { FilterList } from '../components/FilterList';
import { TransactionItem } from '../components/TransactionItem';
import { UIPagination } from '../components/Pagination';

interface DealBlotterScreenProps extends NavigationStackScreenProps { };

const MOCK_TRANSACTIONS = [
  {
    currencies: 'EUR USD',
    date: '07.10.2019 | 16:00',
    amount: 250
  },
  {
    currencies: 'EUR GBP',
    date: '13.12.2019 | 15:00',
    amount: 340.5
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'EUR USD',
    date: '07.10.2019 | 16:00',
    amount: 250
  },
  {
    currencies: 'EUR GBP',
    date: '13.12.2019 | 15:00',
    amount: 340.5
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'EUR USD',
    date: '07.10.2019 | 16:00',
    amount: 250
  },
  {
    currencies: 'EUR GBP',
    date: '13.12.2019 | 15:00',
    amount: 340.5
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'EUR USD',
    date: '07.10.2019 | 16:00',
    amount: 250
  },
  {
    currencies: 'EUR GBP',
    date: '13.12.2019 | 15:00',
    amount: 340.5
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'EUR USD',
    date: '07.10.2019 | 16:00',
    amount: 250
  },
  {
    currencies: 'EUR GBP',
    date: '13.12.2019 | 15:00',
    amount: 340.5
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'EUR USD',
    date: '07.10.2019 | 16:00',
    amount: 250
  },
  {
    currencies: 'EUR GBP',
    date: '13.12.2019 | 15:00',
    amount: 340.5
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
  {
    currencies: 'USD EUR',
    date: '22.12.2019 | 09:00',
    amount: 250
  },
];

const OPTIONS = {
  'Deal Blotter': {
    CBTitle:'Export to Excel',
    onCBClick: () => console.log('export to excel here')
  },
  'Orders history': {
    toggle: {
      left: 'Executed orders',
      right: 'Canceled orders',
      selected: true,
      onPress: (val: boolean) => null
    }
  },
  'Active orders': {}
}

export default function DealBlotterScreen(props: DealBlotterScreenProps) {
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState('Deal Blotter');

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
          }}>Active orders ({MOCK_TRANSACTIONS.length})</Text>
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
            MOCK_TRANSACTIONS.slice(page * 10, page * 10 + 10).map((trans, i) =>
              <TransactionItem
                {...trans}
                key={i}
                onPress={() => props.navigation.push('OrderInfo', { data: { ...trans, title: 'Active order 213493', date: (new Date()).toUTCString() } })}
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
          <UIPagination currentPage={page} pagesMax={Math.floor(MOCK_TRANSACTIONS.length / 10)} onPageChange={(p) => setPage(p)} />
        </View>
      </View>

    </ScrollView>
  );
};