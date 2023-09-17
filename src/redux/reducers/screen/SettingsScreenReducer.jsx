import {SETTINGS_SHOW_HIDE, SETTINGS_SHOW_OPTION} from '../../actions/types';

const INITIAL_STATE = {
  optionIsOpen: {
    authentication: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTINGS_SHOW_OPTION:
      return {
        ...state,
        optionIsOpen: {
          ...state.optionIsOpen,
          [action.payload]: true,
        },
      };

    case SETTINGS_SHOW_HIDE:
      return {
        ...state,
        optionIsOpen: {
          ...state.optionIsOpen,
          [action.payload]: false,
        },
      };

    default:
      return state;
  }
};
