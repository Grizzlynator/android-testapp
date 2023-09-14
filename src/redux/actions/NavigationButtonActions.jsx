import {
  NAVIGATION_BUTTON_CHANGE_MODE,
  NAVIGATION_BUTTON_TOGGLE,
  NAVIGATION_BUTTON_HIDE,
  NAVIGATION_BUTTON_SHOW,
  NAVIGATION_BUTTON_UPDATE_ACTION,
  NAV_BUTTON_CONFIG_SELECTOR_SAVE,
  NAV_BUTTON_CONFIG_SELECTOR_SAVE_SUCCESS,
  NAV_BUTTON_CONFIG_SELECTOR_SAVE_FAIL,
} from './types';

import {contain} from '../../helpers/ArrayHelpers';
import fastNavigationDAO from '../../database/local-storage/fastNavigationDAO';

export const hideNavigationButton = () => {
  return {
    type: NAVIGATION_BUTTON_HIDE,
  };
};

export const showNavigationButton = () => {
  return {
    type: NAVIGATION_BUTTON_SHOW,
  };
};

export const changeNavigationButtonMode = mode => {
  return {
    type: NAVIGATION_BUTTON_CHANGE_MODE,
    payload: mode,
  };
};

export const navigationButtonToggle = () => {
  return {
    type: NAVIGATION_BUTTON_TOGGLE,
  };
};

export const saveNavigationActions = () => {
  return (dispatch, state) => {
    const {actions: navActions} = state().navigationButton;
    dispatch({type: NAV_BUTTON_CONFIG_SELECTOR_SAVE});
    const data = fastNavigationDAO
      .overwrite(navActions)
      .then(() => onSaveNavigationActionSuccess(dispatch))
      .catch(() => onSaveNavigationActionFail(dispatch));
  };
};

const onSaveNavigationActionSuccess = dispatch => {
  dispatch({type: NAV_BUTTON_CONFIG_SELECTOR_SAVE_SUCCESS});
};

const onSaveNavigationActionFail = dispatch => {
  dispatch({type: NAV_BUTTON_CONFIG_SELECTOR_SAVE_FAIL});
};

export const navigationButtonUpdateActions = action => {
  return (dispatch, state) => {
    const {actions} = state().navigationButton;
    const duplicateArrIndex = contain(actions, 'key', action.key);
    if (duplicateArrIndex !== -1) {
      const itemToChangeArrIndex = contain(actions, 'index', action.index);
      actions[duplicateArrIndex] = {
        key: actions[itemToChangeArrIndex].key,
        index: actions[duplicateArrIndex].index,
      };
    }

    const newArray = actions.map(item =>
      item.index === action.index ? action : item,
    );
    dispatch({
      type: NAVIGATION_BUTTON_UPDATE_ACTION,
      payload: newArray,
    });
  };
};
