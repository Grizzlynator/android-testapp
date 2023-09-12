import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import AppDraweOptions from './configs/AppDrawerOptions';
import NewsNavigator from './child-stacks/NewsStack';

const newsIcon = ({tintColor}) => <Icon name="rss" size={21} color="#144774" />;
const contactsIcon = ({tintColor}) => (
  <Icon name="users" size={21} color={tintColor} />
);
const aboutIcon = ({tintColor}) => (
  <Icon name="info" size={22} color={tintColor} />
);
const settingsIcon = ({tintColor}) => (
  <Icon name="settings" size={22} color={tintColor} />
);

const AppDrawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <AppDrawer.Navigator options={AppDraweOptions}>
      <AppDrawer.Screen
        name="News"
        component={NewsNavigator}
        // options={{drawerIcon: newsIcon, headerShown: false}}
      />
    </AppDrawer.Navigator>
  );
};

export default AppStack;
