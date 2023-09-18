import {
  CONTACT_SEARCH_BAR_FILTERING_FINISH,
  CONTACT_ON_LIST_EMPTY_MESSAGE,
  CONTACT_SEARCH_BAR_FILTERING,
  CONTACT_SEARCH_BAR_FILTER_INPUT_UPDATE,
  CONTACTS_FETCH_SUCCESS,
  APP_CONFIG_LANGUAGE_CHANGE,
} from '../../actions/types';

import _ from 'lodash';
import i18n from '../../../translations';

const INITIAL_STATE = {
  filter: '',
  dataToShow: [],
  loading: false,
  messageOnListEmpty: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONTACT_SEARCH_BAR_FILTERING:
      return {
        ...state,
        dataToShow: [],
        messageOnListEmpty: i18n.t('searching'),
      };

    case CONTACT_SEARCH_BAR_FILTERING_FINISH:
      return {
        ...state,
        dataToShow: action.payload,
        messageOnListEmpty: i18n.t('contactsNotFound'),
      };

    case CONTACT_SEARCH_BAR_FILTER_INPUT_UPDATE:
      return {
        ...state,
        filter: action.payload,
      };

    case CONTACTS_FETCH_SUCCESS:
      let dataToShow = action.payload.slice(0, 50);
      dataToShow = _.orderBy(dataToShow, ['lastName'], ['asc']);
      return {
        ...state,
        dataToShow: dataToShow,
      };

    case CONTACT_ON_LIST_EMPTY_MESSAGE:
      return {
        ...state,
        messageOnListEmpty: action.payload,
      };

    case APP_CONFIG_LANGUAGE_CHANGE:
      return {
        ...state,
        filter: '',
      };

    default:
      return state;
  }
};
