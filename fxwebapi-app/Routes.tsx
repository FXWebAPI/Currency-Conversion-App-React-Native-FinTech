import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen, DashboardScreen } from './screens';

const AppNavigator = createStackNavigator({
  Dashboard: DashboardScreen,
  Login: LoginScreen,
}, {
  defaultNavigationOptions: { header: null, headerForceInset: { top: 'never', bottom: 'never' } }
});

export default createAppContainer(AppNavigator);