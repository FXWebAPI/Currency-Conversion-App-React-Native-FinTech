import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { LoginScreen, DashboardScreen, FXChartScreen, FXSpotScreen, NewTransactionScreen, ReceiptScreen, FXOrderScreen, OrderInfoScreen, NewOrderScreen } from './screens';
import Icon from './components/Icon';

const AuthStack = createStackNavigator({
  Login: LoginScreen,
}, {
  defaultNavigationOptions: { header: null }
});

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
  FXChart: FXChartScreen
}, {
  defaultNavigationOptions: { header: null },
  initialRouteName: 'Dashboard'
});
DashboardStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const FXSpotStack = createStackNavigator({
  Spot: FXSpotScreen,
  Transaction: NewTransactionScreen,
  Receipt: ReceiptScreen,
  OrderInfo: OrderInfoScreen
}, {
  defaultNavigationOptions: { header: null },
  initialRouteName: 'Spot'
});
FXSpotStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const FXOrderStack = createStackNavigator({
  Spot: FXOrderScreen,
  NewOrder: NewOrderScreen,
  Receipt: ReceiptScreen,
  OrderInfo: OrderInfoScreen
}, {
  defaultNavigationOptions: { header: null },
  initialRouteName: 'Spot'
});
FXOrderStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const AppTabs = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardStack,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name='dashboard_icon' size={24} color={tintColor} />
      },
    }
  },
  Spot: {
    screen: FXSpotStack,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name='contrast' size={24} color={tintColor} />
      },
    }
  },
  Order: {
    screen: FXOrderStack,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name='order_icon' size={24} color={tintColor} />
      },
    }
  },
  Deal: {
    screen: DashboardScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name='blotter_icon' size={24} color={tintColor} />
      },
    }
  }
}, {
  order: ['Dashboard', 'Spot', 'Order', 'Deal'],
  tabBarOptions: {
    showLabel: false
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppTabs
  },
  {
    initialRouteName: 'Auth',
  }
));