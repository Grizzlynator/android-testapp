import favoriteContactsDao from '../../../database/local-storage/favoriteContactsDao';
import _ from 'lodash';

export const CONTACTS_DEFAULT_STATE = {
  favoriteContactList: {
    contactsID: [],
    data: [],
    loading: false,
    error: '',
  },
  contactList: {
    data: [],
    loading: false,
    error: '',
  },
  contact: {
    data: {},
    loading: false,
    error: '',
  },
};

const contacts = async () => {
  let favoriteContactList = await favoriteContactsDao.get();
  if (_.isEmpty(favoriteContactList)) {
    return CONTACTS_DEFAULT_STATE;
  }

  return {
    ...CONTACTS_DEFAULT_STATE,
    favoriteContactList: {
      ...CONTACTS_DEFAULT_STATE.favoriteContactList,
      ...favoriteContactList,
    },
  };
};

export default contacts;
