import {
  NEWS_FETCH,
  NEWS_FETCH_SUCCESS,
  NEWS_FETCH_FAIL,
  NEWS_DETAILS_LOADING,
  NEWS_SET_MARKED_AS_READ_LIST,
  NEWS_RESET_MARKED_AS_READ_LIST,
  UPDATE_NEWS_LIST,
} from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case NEWS_DETAILS_LOADING:
      return {
        ...state,
        detailsLoading: action.payload,
      };

    case NEWS_FETCH:
      return {
        ...state,
        loading: true,
      };

    case NEWS_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        news: action.payload,
        error: '',
      };
    }

    case UPDATE_NEWS_LIST: {
      return {
        ...state,
        news: action.payload,
      };
    }

    case NEWS_FETCH_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case NEWS_SET_MARKED_AS_READ_LIST: {
      return {
        ...state,
        markedAsReadIds: action.payload,
      };
    }

    case NEWS_RESET_MARKED_AS_READ_LIST: {
      return {
        ...state,
        markedAsReadIds: [],
      };
    }

    default:
      return state;
  }
};
