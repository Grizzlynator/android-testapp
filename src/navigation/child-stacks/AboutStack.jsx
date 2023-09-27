import React from 'react';
import {connect, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import AboutScreen from '../../screens/AboutScreen';
import MainPageOptions from '../configs/MainPageOptions';
import i18n from '../../translations';

const AboutStack = createStackNavigator();

function AboutNavigator() {
  useSelector(state => state.appConfig.language);
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name={'AboutScreen'}
        component={AboutScreen}
        options={navigation => MainPageOptions(navigation, i18n.t('about'))}
      />
    </AboutStack.Navigator>
  );
}

export default connect()(AboutNavigator);
