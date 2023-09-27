import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import MainPageOptions from '../configs/MainPageOptions';
import ScheduleScreen from '../../screens/ScheduleScreen';
import i18n from '../../translations';

const ScheduleStack = createStackNavigator();

const ScheduleNavigator = () => {
  return (
    <ScheduleStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTitleAlign: 'center',
        cardStyle: {backgroundColor: 'white'},
      }}>
      <ScheduleStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={navigation => MainPageOptions(navigation, i18n.t('schedule'))}
      />
    </ScheduleStack.Navigator>
  );
};

export default connect()(ScheduleNavigator);
