import React from 'react';
import {connect, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FavoriteContactsScreen from '../../screens/contacts/FavoriteContactsScreen';
import AllContactsScreen from '../../screens/contacts/AllContactsScreen';
import ContactsDetailsScreen from '../../screens/contacts/ContactDetailsScreen';
import MainPageOptions from '../configs/MainPageOptions';
import {HeaderBackButton} from '../../components/HeaderBackButton';
import i18n from '../../translations';

const styles = {
  indicatorStyle: {
    backgroundColor: '#0093f1',
    height: 5,
  },
  labelStyle: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
  mainStyle: {
    backgroundColor: '#144774',
    color: 'white',
  },
};

const Tab = createMaterialTopTabNavigator();
function ContactsLists() {
  useSelector(state => state.appConfig.language);
  return (
    <Tab.Navigator
      initialRouteName="Favorite"
      screenOptions={{
        swipeEnabled: true,
        tabBarIndicatorStyle: styles.indicatorStyle,
        tabBarLabelStyle: styles.labelStyle,
        tabBarStyle: styles.mainStyle,
      }}>
      <Tab.Screen
        name="Favorite"
        component={FavoriteContactsScreen}
        options={{
          title: i18n.t('favorites'),
        }}
      />
      <Tab.Screen
        name="All"
        component={AllContactsScreen}
        options={{
          title: i18n.t('all'),
        }}
      />
    </Tab.Navigator>
  );
}

ContactsLists.navigationOptions = ({navigation}) => {
  return {
    headerLeft: <HeaderBackButton navigation={navigation} />,
    drawerLockMode: navigation.state.index === 0 ? 'unlocked' : 'locked-closed',
  };
};

const ContactDetailScreenOptions = ({navigation}) => {
  return {
    title: i18n.t('contacts'),
    headerLeft: () => <HeaderBackButton navigation={navigation} />,
    headerLeftContainerStyle: {paddingLeft: 10},
  };
};

const ContactsStack = createStackNavigator();

function ContactsNavigator() {
  useSelector(state => state.appConfig.language);
  return (
    <ContactsStack.Navigator
      screenOptions={navigation =>
        MainPageOptions(navigation, i18n.t('contacts'))
      }>
      <ContactsStack.Screen
        name="ContactsScreen"
        component={ContactsLists}
        options={{
          headerTitleAlign: 'center',
          cardStyle: {backgroundColor: '#e4e3f1'},
          defaultNavigationOptions: {title: 'Contacts'},
        }}
      />
      <ContactsStack.Screen
        name="ContactDetailsScreen"
        component={ContactsDetailsScreen}
        options={ContactDetailScreenOptions}
      />
    </ContactsStack.Navigator>
  );
}

export default connect()(ContactsNavigator);
