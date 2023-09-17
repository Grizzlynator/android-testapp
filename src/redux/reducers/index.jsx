import {combineReducers} from 'redux';

import AppConfigReducer from './data/AppConfigReducer';
import NewsReducer from './data/NewsReducer';

const RootReducer = combineReducers({
  appConfig: AppConfigReducer,
  news: NewsReducer,
});

export default RootReducer;
