import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import AppDraweOptions from './configs/AppDrawerOptions';
import NewsNavigator from './child-stacks/NewsStack';
import AboutScreen from '../screens/AboutScreen';

const newsIcon = () => <Icon name="rss" size={21} color="#144774" />;
const contactsIcon = () => <Icon name="users" size={21} />;
const aboutIcon = () => <Icon name="info" size={22} />;
const settingsIcon = ({tintColor}) => (
  <Icon name="settings" size={22} color={tintColor} />
);

const AppDrawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <AppDrawer.Navigator
      // initialRouteName="NewsScreen"
      screenOptions={AppDraweOptions}>
      <AppDrawer.Screen
        name="News"
        component={NewsNavigator}
        options={{drawerIcon: newsIcon}}
      />
      <AppDrawer.Screen
        name="About"
        component={AboutScreen}
        options={{drawerIcon: aboutIcon}}
      />
    </AppDrawer.Navigator>
  );
};
