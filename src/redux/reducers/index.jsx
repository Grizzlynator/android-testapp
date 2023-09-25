import {combineReducers} from 'redux';

import ScheduleItemsReducer from './data/ScheduleItemsReducer';
import ScheduleReducer from './data/ScheduleReducer';
import ScheduleScreenReducer from './screen/ScheduleScreenReducer';
import NewsReducer from './data/NewsReducer';
import ProfileReducer from './data/ProfileReducer';
import ContactsReducer from './data/ContactsReducer';
import AppConfigReducer from './data/AppConfigReducer';
import SettingsScreenReducer from './screen/SettingsScreenReducer';
import NavigationButtonReducer from './screen/NavigationButonReducer';
import NavigationButtonConfigReducer from './screen/NavigationButtonActionSelectorReducer';
import AllContactsScreenReducer from './screen/AllContactsScreenReducer';
import NotificationHistoryListReducer from './NotificationHistoryListReducer';

import ScheduleFilterReducer from './data/ScheduleFilterReducer';
import ScheduleFilterScreenReducer from './screen/ScheduleFilterFormReducer';
import LoginFormReducer from './LoginFormReducer';
import NotifierReducer from './NotifierReducer';
import AppStateReducer from './AppStateReducer';

const RootReducer = combineReducers({
  appState: AppStateReducer,
  appConfig: AppConfigReducer,
  contacts: ContactsReducer,
  contactsScreen: AllContactsScreenReducer,
  loginForm: LoginFormReducer,
  navigationButton: NavigationButtonReducer,
  navigationButtonConfig: NavigationButtonConfigReducer,
  news: NewsReducer,
  profile: ProfileReducer,
  scheduleFilterForm: ScheduleFilterScreenReducer,
  scheduleFilter: ScheduleFilterReducer,
  scheduleScreen: ScheduleScreenReducer,
  scheduleItems: ScheduleItemsReducer,
  schedule: ScheduleReducer,
  settingsScreen: SettingsScreenReducer,
  notifier: NotifierReducer,
  notificationHistory: NotificationHistoryListReducer,
});

export default RootReducer;
