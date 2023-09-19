// import { Header } from 'react-navigation-stack';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Dimensions} from 'react-native';

export const WINDOW_HEIGHT = Math.round(Dimensions.get('window').height);
export const STATUS_BAR_HEIGHT = getStatusBarHeight();
