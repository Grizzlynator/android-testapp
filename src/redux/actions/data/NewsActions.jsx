import {
  NEWS_FETCH,
  NEWS_FETCH_FAIL,
  NEWS_FETCH_SUCCESS,
  NEWS_RESET_MARKED_AS_READ_LIST,
  NEWS_SET_MARKED_AS_READ_LIST,
  UPDATE_NEWS_LIST,
} from '../types';

import * as newsService from '../../../services/newsService';
import newsDao from '../../../database/local-storage/newsDao';

/**
 *
 * @param {String} language - run || en || lv
 */

export const fetchNews = language => {
  // console.log('-NewsAction fetchNes-');
  return (dispatch, state) => {
    const {markedAsReadIds: markedIds} = state().news;
    dispatch({type: NEWS_FETCH});
    newsService
      .fetchTSINews(language)
      .then(news => onFetchSuccess(dispatch, news, markedIds))
      .catch(error => onFetchFail(dispatch, error));
  };
};

const onFetchSuccess = async (dispatch, news, markedIds) => {
  const unreadNews = news.filter(f => !markedIds.includes(f.id));
  if (unreadNews.length) {
    await newsDao.updateProps({hasUnreadMessages: true});
  }
  dispatch({
    type: NEWS_FETCH_SUCCESS,
    payload: unreadNews,
  });
};

const onFetchFail = (dispatch, err) => {
  dispatch({
    type: NEWS_FETCH_FAIL,
    payload: err.message,
  });
};

/**
 * Mark news item as read
 * @param id news id
 */

export const markAsRead = id => {
  return (dispatch, state) => {
    const {markedAsReadIds, news} = state().news;
    newsService.markNewsAsRead(markedAsReadIds, id).then(async markedIds => {
      const unreadNews = news.filter(f => !markedIds.includes(f.id));
      if (!unreadNews.length) {
        await newsDao.updateProps({hasUnreadMessages: false});
      }
      dispatch({type: NEWS_SET_MARKED_AS_READ_LIST, payload: markedIds});
      dispatch({type: UPDATE_NEWS_LIST, payload: unreadNews});
    });
  };
};

/**
 * Unmark all read user news
 */

export const unmarkAsReadAll = () => {
  return (dispatch, state) => {
    dispatch({
      type: NEWS_RESET_MARKED_AS_READ_LIST,
    });
  };
};
