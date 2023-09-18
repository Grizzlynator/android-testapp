import React from 'react';
import {connect, useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import i18n from '../translations';
import AppDraweOptions from './configs/AppDrawerOptions';
import NewsNavigator from './child-stacks/NewsStack';
import AboutScreen from '../screens/AboutScreen';
import SettingsNavigator from './child-stacks/SettingsStack';
import DrawerNavigation from '../components/DrawerNavigation';
import MainPageOptions from './configs/MainPageOptions';
import AboutNavigator from './child-stacks/AboutStack';

const newsIcon = () => <Icon name="rss" size={21} color="#144774" />;
const contactsIcon = () => <Icon name="users" size={21} />;
const aboutIcon = () => <Icon name="info" size={22} />;
const settingsIcon = () => <Icon name="settings" size={22} />;

const AppDrawer = createDrawerNavigator();

function AppStack() {
  const {language} = useSelector(state => state.appConfig);
  console.log('AppStack language: ', language);
  // console.log('AppStack news name: ', i18n.t('news'));
  // console.log('AppStack about name: ', i18n.t('about'));
  return (
    <AppDrawer.Navigator
      // initialRouteName="NewsScreen"
      drawerContent={props => <DrawerNavigation {...props} />}
      screenOptions={AppDraweOptions}>
      <AppDrawer.Screen
        name="News"
        component={NewsNavigator}
        options={{
          drawerIcon: newsIcon,
          title: i18n.t('news'),
        }}
      />
      <AppDrawer.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerIcon: settingsIcon,
          headerShown: false,
          title: i18n.t('settings'),
        }}
      />
      <AppDrawer.Screen
        name="About"
        component={AboutNavigator}
        options={{
          headerShown: false,
          drawerIcon: aboutIcon,
          title: i18n.t('about'),
        }}
      />
    </AppDrawer.Navigator>
  );
}

// export default connect(state => ({language: state.appConfig.language}))(
//   AppStack,
// );
export default connect(
  state => ({language: state.appConfig}),
  dispatch => ({
    dispatch: dispatch,
  }),
)(AppStack);
