import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import NewsScreen from '../../screens/news/NewsScreen';

const NewsStack = createStackNavigator();

function NewsNavigator() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name={'NewsList'}
        component={NewsScreen}
        options={{
          headerShown: false,
        }}
      />
    </NewsStack.Navigator>
  );
}

export default NewsNavigator;
