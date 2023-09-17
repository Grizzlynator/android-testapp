import {NAV_BUTTON_CONFIG_SELECTOR_SHOW} from '../../actions/types';
import {NAV_BUTTON_CONFIG_SELECTOR_HIDE} from '../../actions/types';

const INITIAL_STATE = {
  isVisible: false,
  configurableItem: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAV_BUTTON_CONFIG_SELECTOR_HIDE:
      return {
        ...state,
        isVisible: false,
      };

    case NAV_BUTTON_CONFIG_SELECTOR_SHOW:
      return {
        ...state,
        isVisible: true,
        configurableItem: action.payload,
      };

    default:
      return state;
  }
};
