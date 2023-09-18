import initProfileState from './profile';
import initConfigState from './appConfig';
import contactsState from './contacts';
// import initNavButtonState from './navigationButton';
import initScheduleFilterState from './scheduleFilter';
import initNewsState from './news';
import initNotifierState from './notifier';

const initialState = async () => {
  const profile = await initProfileState();
  const appConfig = await initConfigState();
  const contacts = await contactsState();
  // const navigationButton = await initNavButtonState();
  const scheduleFilter = await initScheduleFilterState();
  const news = await initNewsState();
  const notifier = await initNotifierState();

  return {
    appConfig: appConfig,
    profile: profile,
    contacts: contacts,
    // navigationButton: navigationButton,
    scheduleFilter: scheduleFilter,
    notifier: notifier,
    news: news,
  };
};

export default initialState;
