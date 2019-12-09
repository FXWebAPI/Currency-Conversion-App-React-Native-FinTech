import React, { useState } from 'react';
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { text, colors } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { UIAddRound, UIBtn } from '../components/Buttons';
import { FilterList } from '../components/FilterList';
import { TransactionItem } from '../components/TransactionItem';

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
];

export default function DealBlotterScreen(props: DealBlotterScreenProps) {
  const [focusedTrans, setFocusedTrans] = useState(0);
  const [executedOrders, setExecutedOrders] = useState(true);

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
        <FilterList title='Last transactions' items={
          MOCK_TRANSACTIONS.slice(-5).map((trans, i) =>
            <TransactionItem
              {...trans}
              key={i}
              focused={focusedTrans === i}
              onPress={() => setFocusedTrans(i)}
            />
          )
        }
        />
        <UIBtn type='secondary' title='See all' size='lg' style={{ margin: 16, alignSelf: 'center' }} />

        <FilterList
          title='Orders history'
          items={
            MOCK_TRANSACTIONS.slice(-5).map((trans, i) =>
              <TransactionItem
                {...trans}
                key={i}
                focused={focusedTrans === i}
                onPress={() => props.navigation.push('OrderInfo', { data: { ...trans, title: 'Active order 213493', date: (new Date()).toUTCString() } })}
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
        <UIBtn type='secondary' title='See all' size='lg' style={{ margin: 16, alignSelf: 'center' }} />
      </View>

    </ScrollView>
  );
};