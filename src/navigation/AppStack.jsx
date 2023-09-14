import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import i18n from '../translations';
import AppDraweOptions from './configs/AppDrawerOptions';
import NewsNavigator from './child-stacks/NewsStack';
import AboutScreen from '../screens/AboutScreen';
import SettingsNavigator from './child-stacks/SettingsStack';

const newsIcon = () => <Icon name="rss" size={21} color="#144774" />;
const contactsIcon = () => <Icon name="users" size={21} />;
const aboutIcon = () => <Icon name="info" size={22} />;
const settingsIcon = ({tintColor}) => (
  <Icon name="settings" size={22} color={tintColor} />
);

const AppDrawer = createDrawerNavigator();

function AppStack(props) {
  const {language} = props;
  console.log('AppStack language: ', language);
  console.log('AppStack news name: ', i18n.t('news'));
  console.log('AppStack about name: ', i18n.t('about'));
  return (
    <AppDrawer.Navigator
      // initialRouteName="NewsScreen"
      screenOptions={AppDraweOptions}>
      <AppDrawer.Screen
        name={i18n.t('news')}
        component={NewsNavigator}
        options={{drawerIcon: newsIcon}}
      />
      <AppDrawer.Screen
        name={i18n.t('settings')}
        component={SettingsNavigator}
        options={{drawerIcon: settingsIcon, headerShown: false}}
      />
      <AppDrawer.Screen
        name={i18n.t('about')}
        component={AboutScreen}
        options={{drawerIcon: aboutIcon}}
      />
    </AppDrawer.Navigator>
  );
}

export default connect(state => ({language: state.appConfig.language}))(
  AppStack,
);
