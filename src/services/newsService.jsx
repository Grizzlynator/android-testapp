import {fetchRSSNews, fetchRSSNewsEng} from '../api/TTIServer';
import {convertOtherNews} from '../converters/NewsConverter';
import _ from 'lodash';
import newsDao from '../database/local-storage/newsDao';

/**
 *
 * @param language
 * @returns {Promise<*>}
 */

export const fetchTSINews = async language => {
  return await otherNews(language);
};

const otherNews = async language => {
  if (language === 'en') {
    language = '';
  }
  let news = await fetchRSSNews(7000, language);
  return convertOtherNews(news);
};

/**
 *
 * @param markedAsReadIds -
 * @param id
 */

export const markNewsAsRead = async (markedAsReadIds, id) => {
  const markedIds = _.cloneDeep(markedAsReadIds);
  if (markedIds.length === 10) {
    markedIds.shift();
  }
  markedIds.push(id);
  await newsDao.updateProps({markedAsReadIds: markedIds});
  return markedIds;
};
