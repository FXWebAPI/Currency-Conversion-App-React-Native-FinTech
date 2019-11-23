import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { LoginScreen, DashboardScreen, FXChartScreen } from './screens';

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

const AppTabs = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardStack,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <MaterialIcons name='home' size={24} color={tintColor} />
      },
    }
  },
  Spot: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <MaterialIcons name='tonality' size={24} color={tintColor} />
      },
    }
  },
  Order: {
    screen: DashboardScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <MaterialIcons name='swap-horiz' size={24} color={tintColor} />
      },
    }
  },
  Deal: {
    screen: DashboardScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <MaterialIcons name='receipt' size={24} color={tintColor} />
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
    initialRouteName: 'App', // DEV change to Auth afterwards
  }
));