import {combineReducers} from 'redux';

import AppConfigReducer from './data/AppConfigReducer';

const RootReducer = combineReducers({
  appConfig: AppConfigReducer,
});

export default RootReducer;
