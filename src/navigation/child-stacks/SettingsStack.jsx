import React from 'react';
import {connect, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import i18n from '../../translations';
import LanguagesScreen from '../../screens/settings/LanguagesScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import ScheduleFilterScreen from '../../screens/settings/ScheduleFilterScreen';
import {HeaderBackButton} from '../../components/HeaderBackButton';
import MainPageOptions from '../configs/MainPageOptions';

const LanguageScreenOptions = ({navigation}) => {
  return {
    title: i18n.t('settings'),
    headerLeft: () => <HeaderBackButton navigation={navigation} />,
    headerLeftContainerStyle: {paddingLeft: 10},
  };
};

const SettingsStack = createStackNavigator();

const SettingsNavigator = props => {
  useSelector(state => state.appConfig);
  console.log("name={i18n.t('language')}->", i18n.t('language'));
  return (
    <SettingsStack.Navigator
      initialRouteName={'SettingsScreen'}
      screenOptions={MainPageOptions}>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={navigation => MainPageOptions(navigation)}
      />
      <SettingsStack.Screen
        name="LanguagesScreen"
        component={LanguagesScreen}
        options={navigation => LanguageScreenOptions(navigation)}
      />
      <SettingsStack.Screen
        name="ScheduleFilterScreen"
        component={ScheduleFilterScreen}
        options={({navigation}) => ({
          title: i18n.t('scheduleFilter'),
        })}
      />
    </SettingsStack.Navigator>
  );
};

// const mapStateToProps = state => {
//   const {appConfig} = state;
//   return {
//     language: appConfig.language,
//   };
// };
export default connect()(SettingsNavigator);
