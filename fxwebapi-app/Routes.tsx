import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { LoginScreen, DashboardScreen } from './screens';

const AppNavigator = createStackNavigator({
  Dashboard: DashboardScreen,
  Login: LoginScreen,
}, {
  defaultNavigationOptions: { header: null, headerForceInset: { top: 'never', bottom: 'never' } }
});

const TabNavigator = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardScreen,
    path: '/dashboard',
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        return <MaterialIcons name='home' size={24} color={tintColor} />
      },
    }
  },
  Spot: {
    screen: LoginScreen,
    path: '/dashboard',
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        return <MaterialIcons name='tonality' size={24} color={tintColor} />
      },
    }
  },
  Order: {
    screen: DashboardScreen,
    path: '/dashboard',
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        return <MaterialIcons name='swap-horiz' size={24} color={tintColor} />
      },
    }
  },
  Deal: {
    screen: DashboardScreen,
    path: '/dashboard',
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => {
        return <MaterialIcons name='receipt' size={24} color={tintColor} />
      },
    }
  }
}, {
  tabBarOptions: {
    showLabel: false
  }
});

export default createAppContainer(TabNavigator);