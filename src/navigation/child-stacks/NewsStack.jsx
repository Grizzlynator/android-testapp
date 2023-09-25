import React from 'react';
import {connect, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import NewsScreen from '../../screens/news/NewsScreen';

import i18n from '../../translations';
import MainPageOptions from '../configs/MainPageOptions';
const NewsStack = createStackNavigator();
import NewsDetailsScreen from '../../screens/news/NewsDetailsScreen';

function NewsNavigator() {
  const language = useSelector(store => store.appConfig.language);
  // console.log('new title: ', i18n.t('news'));
  return (
    <NewsStack.Navigator
      screenOptions={({route, navigation}) => ({
        // headerShown: false,
        headerTitleAlign: 'center',
        gestureEnabled: true,
        headerShown: true,
        cardStyle: {backgroundColor: '#EFF0F3'},
        defaultNavigationOptions: {title: 'News'},
      })}>
      <NewsStack.Screen
        name={'NewsList'}
        component={NewsScreen}
        options={navigation => MainPageOptions(navigation, i18n.t('news'))}
      />
      <NewsStack.Screen
        name={'NewsDetail'}
        component={NewsDetailsScreen}
        options={{
          title: i18n.t('news'),
        }}
      />
    </NewsStack.Navigator>
  );
}

export default connect()(NewsNavigator);
