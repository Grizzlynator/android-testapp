import {
  CONTACT_DETAILS_FETCH,
  CONTACT_DETAILS_FETCH_FAIL,
  CONTACT_DETAILS_FETCH_SUCCESS,
  CONTACTS_FAVORITES_UPDATE,
  CONTACTS_FETCH,
  CONTACTS_FETCH_FAIL,
  CONTACTS_FETCH_SUCCESS,
} from '../types';

import favoriteContactsDao from '../../../database/local-storage/favoriteContactsDao';
import {fetchContact, fetchContactList} from '../../../api/TTIServer';
import _ from 'lodash';

/**
 * Fetch contact list from server.
 * @param lang - en | ru | lv
 */

export const fetchContacts = (lang = 'en') => {
  return dispatch => {
    dispatch({type: CONTACTS_FETCH});
    fetchContactList(5000, lang)
      .then(contacts => {
        onContactsFetchSuccess(dispatch, contacts);
      })
      .catch(err => onContactsFetchFail(dispatch, err));
  };
};

const onContactsFetchSuccess = (dispatch, contacts) => {
  dispatch({
    type: CONTACTS_FETCH_SUCCESS,
    payload: contacts,
  });
};

const onContactsFetchFail = (dispatch, error) => {
  dispatch({
    type: CONTACTS_FETCH_FAIL,
    payload: error,
  });
};

/**
 * Get contacts details from server.
 * @param contactID
 */

export const fetchContactDetails = contactID => {
  return dispatch => {
    dispatch({type: CONTACT_DETAILS_FETCH});
    fetchContact(5000, contactID)
      .then(contact => onContactDetailsFetchSuccess(dispatch, contact))
      .catch(err => onContactDetailsFetchFail(dispatch, err));
  };
};

const onContactDetailsFetchSuccess = (dispatch, contact) => {
  dispatch({
    type: CONTACT_DETAILS_FETCH_SUCCESS,
    payload: contact,
  });
};

const onContactDetailsFetchFail = (dispatch, error) => {
  dispatch({
    type: CONTACT_DETAILS_FETCH_FAIL,
    payload: error,
  });
};

/**
 * Get saved contact details from local storage.
 * @param contactID
 */

export const getContactDetails = contactID => {
  return (dispatch, state) => {
    const {favoriteContactList} = state().contacts;
    const contact = favoriteContactList.data.find(({_id}) =>
      _.isEqual(_id, contactID),
    );
    onContactDetailsFetchSuccess(dispatch, contact);
  };
};

/**
 * Save favorite contact.
 * @param contact - contact object.
 */

export const addContactToFavorites = contact => {
  return (dispatch, state) => {
    const {favoriteContactList} = state().contacts;
    const contactsID = [...favoriteContactList.contactsID, contact._id];
    const data = [...favoriteContactList.data, contact];

    const newFavorites = {contactsID, data};
    favoriteContactsDao
      .overwrite(newFavorites)
      .then(() => onFavoriteSaveSuccess(dispatch, newFavorites));
  };
};

const onFavoriteSaveSuccess = (dispatch, newFavorites) => {
  dispatch({
    type: CONTACTS_FAVORITES_UPDATE,
    payload: newFavorites,
  });
};

/**
 * Remove contact from favorites.
 * @param contactID
 */

export const removeContactFromFavorites = contactID => {
  return (dispatch, state) => {
    const {favoriteContactList} = state().contacts;
    let favorites = _.cloneDeep(favoriteContactList);
    favorites = removeContact(contactID, favorites);

    favoriteContactsDao
      .overwrite(favorites)
      .then(() => onFavoriteSaveSuccess(dispatch, favorites));
  };
};

const removeContact = (contactID, favorites) => {
  const {contactsID, data} = favorites;
  const updatedData = _.remove(data, item => !_.isEqual(item._id, contactID));
  const updatedContactsID = _.remove(
    contactsID,
    id => !_.isEqual(id, contactID),
  );
  return {contactsID: updatedContactsID, data: updatedData};
};
