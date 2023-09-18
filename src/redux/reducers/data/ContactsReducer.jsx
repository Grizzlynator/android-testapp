import {
  CONTACTS_FETCH,
  CONTACTS_FETCH_FAIL,
  CONTACTS_FETCH_SUCCESS,
  CONTACTS_FAVORITES_UPDATE,
  CONTACT_DETAILS_FETCH,
  CONTACT_DETAILS_FETCH_SUCCESS,
  CONTACT_DETAILS_FETCH_FAIL,
  APP_CONFIG_LANGUAGE_CHANGE,
} from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CONTACTS_FETCH: {
      return {
        ...state,
        contactList: {
          ...state.contactList,
          loading: true,
        },
      };
    }

    case CONTACTS_FETCH_SUCCESS: {
      return {
        ...state,
        contactList: {
          data: action.payload,
          loading: false,
          error: '',
        },
      };
    }

    case CONTACTS_FETCH_FAIL: {
      return {
        ...state,
        contactList: {
          ...state.contactList,
          loading: false,
          error: action.payload,
        },
      };
    }

    case CONTACTS_FAVORITES_UPDATE: {
      return {
        ...state,
        favoriteContactList: {
          ...state.favoriteContactList,
          ...action.payload,
        },
      };
    }

    case CONTACT_DETAILS_FETCH: {
      return {
        ...state,
        contact: {
          ...state.contact,
          loading: true,
        },
      };
    }

    case CONTACT_DETAILS_FETCH_SUCCESS: {
      return {
        ...state,
        contact: {
          data: action.payload,
          loading: false,
          error: '',
        },
      };
    }

    case CONTACT_DETAILS_FETCH_FAIL: {
      return {
        ...state,
        contact: {
          loading: false,
          error: action.payload,
        },
      };
    }

    case APP_CONFIG_LANGUAGE_CHANGE: {
      return {
        ...state,
        contactList: {
          data: [],
          loading: false,
          error: '',
        },
      };
    }

    default:
      return state;
  }
};
