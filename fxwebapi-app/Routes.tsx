import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
}, {
  defaultNavigationOptions: { header: null, headerForceInset: { top: 'never', bottom: 'never' } }
});

export default createAppContainer(AppNavigator);