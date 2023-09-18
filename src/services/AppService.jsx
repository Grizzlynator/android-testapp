import {getVersion} from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

export const cleanStorageIfNewVersion = async () => {
  const lastAppVersion = await AsyncStorage.getItem('LAST_APP_VERSION');
  const currentAppVersion = getVersion();

  if (!_.isEqual(lastAppVersion, currentAppVersion)) {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('LAST_APP_VERSION', currentAppVersion);
  }
};
