import newsDao from '../../../database/local-storage/newsDao';
import _ from 'lodash';

export const NEWS_INITIAL_STATE = {
  markedAsReadIds: [],
  detailsLoading: true,
  hasUnreadMessages: true,
  loading: false,
  error: '',
  news: [],
};

const news = async () => {
  const newsInitState = await newsDao.get();
  if (_.isEmpty(newsInitState)) {
    await newsDao.overwrite(NEWS_INITIAL_STATE);
    return NEWS_INITIAL_STATE;
  }

  return newsInitState;
};

export default news;
