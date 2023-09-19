import {
  CONTACT_SEARCH_BAR_FILTERING_FINISH,
  CONTACT_SEARCH_BAR_FILTERING,
  CONTACT_SEARCH_BAR_FILTER_INPUT_UPDATE,
} from './types';

import * as contactService from '../../services/contactsService';

import _ from 'lodash';

/**
 *
 * @param {String} query - path of lecturer name.
 */

export const updateContactFilter = (query = '') => {
  return (dispatch, state) => {
    const {data} = state().contacts.contactList;

    dispatch({type: CONTACT_SEARCH_BAR_FILTERING});
    dispatch({
      type: CONTACT_SEARCH_BAR_FILTER_INPUT_UPDATE,
      payload: query,
    });

    contactService
      .query(data, query, 50)
      .then(filteredContacts => onFilterSuccess(dispatch, filteredContacts))
      .catch(err => onFilterFail(dispatch, err));
  };
};

const onFilterSuccess = (dispatch, contacts) => {
  const filteredContacts = _.orderBy(contacts, ['lastName'], ['asc']);
  dispatch({
    type: CONTACT_SEARCH_BAR_FILTERING_FINISH,
    payload: filteredContacts,
  });
};

const onFilterFail = (dispatch, err) => {
  dispatch({
    type: CONTACT_SEARCH_BAR_FILTERING_FINISH,
    payload: [],
  });
};
