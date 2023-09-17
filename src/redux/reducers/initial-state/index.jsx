import initConfigState from './appConfig';
import initNewsState from './news';
import initScheduleFilterState from './scheduleFilter';

const initialState = async () => {
  const appConfig = await initConfigState();
  const news = await initNewsState();
  const scheduleFilter = await initScheduleFilterState();

  return {
    appConfig,
    news: news,
    scheduleFilter: scheduleFilter,
  };
};

export default initialState;
