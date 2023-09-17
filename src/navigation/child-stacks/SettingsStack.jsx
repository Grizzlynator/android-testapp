import React from 'react';
import {connect, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import i18n from '../../translations';
import LanguagesScreen from '../../screens/settings/LanguagesScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';

// const LanguageScreenOptions = ({ navigation }) => {
//   return {
//     header: <HeaderBackButton navigation={navigation} />,
//   };
// };

const SettingsStack = createStackNavigator();

const SettingsNavigator = (props) => {
  useSelector(state => state.appConfig);
  console.log("name={i18n.t('language')}->", i18n.t('language'));
  return (
    <SettingsStack.Navigator
      screenOptions={({route, navigation}) => ({
        // headerShown: false,
        gestureEnabled: true,
      })}>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={({navigation}) => ({
          title: i18n.t('settings'),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate(NewsDetails)}>
              <Icon
                name="menu"
                size={20}
                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {paddingLeft: 10},
        })}
      />
      <SettingsStack.Screen
        name="LanguagesScreen"
        component={LanguagesScreen}
        options={({navigation}) => ({
          title: i18n.t('language'),
        })}
      />
      {/* <SettingsStack.Screen name="ScheduleFilterScreen" /> */}
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
