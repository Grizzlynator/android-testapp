import {
  NAV_BUTTON_CONFIG_SELECTOR_HIDE,
  NAV_BUTTON_CONFIG_SELECTOR_SHOW,
} from './types';

export const showSelector = configurableItemIndex => {
  return {
    type: NAV_BUTTON_CONFIG_SELECTOR_SHOW,
    payload: configurableItemIndex,
  };
};

export const hideSelector = () => {
  return {
    type: NAV_BUTTON_CONFIG_SELECTOR_HIDE,
  };
};
