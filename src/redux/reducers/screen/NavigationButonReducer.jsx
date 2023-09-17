import {
  NAVIGATION_BUTTON_CHANGE_MODE,
  NAVIGATION_BUTTON_TOGGLE,
  NAVIGATION_BUTTON_HIDE,
  NAVIGATION_BUTTON_SHOW,
  NAVIGATION_BUTTON_UPDATE_ACTION,
} from '../../actions/types';

const INITIAL_STATE = {
  isVisible: true,
  toggle: false,
  mode: 'regular',
  actions: [
    {key: 'Schedule', index: 0},
    {key: 'Settings', index: 1},
    {key: 'News', index: 2},
  ],
};

export default (state = {}, action) => {
  switch (action.type) {
    case NAVIGATION_BUTTON_HIDE:
      return {
        ...state,
        isVisible: false,
      };

    case NAVIGATION_BUTTON_SHOW:
      return {
        ...state,
        isVisible: true,
      };

    case NAVIGATION_BUTTON_UPDATE_ACTION:
      return {
        ...state,
        actions: action.payload,
      };

    case NAVIGATION_BUTTON_CHANGE_MODE:
      return {
        ...state,
        mode: action.payload,
      };

    case NAVIGATION_BUTTON_TOGGLE:
      return {
        ...state,
        toggle: !state.toggle,
      };

    default:
      return state;
  }
};
