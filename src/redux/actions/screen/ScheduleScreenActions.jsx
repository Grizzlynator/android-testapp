import {
  SCH_FILTER_PARAMS_UPDATE,
  SCHEDULE_SCREEN_CHANGE_PAGE,
  SCHEDULE_SCREEN_IS_FILTER_OPEN,
  SCHEDULE_SCREEN_OVERLAY_VISIBLE,
} from '../types';

import {getRange} from '../../../workers/UnixTimestampService';

export const switchPage = (range, shift) => {
  return dispatch => {
    const paramsToUpdate = getRange(range, shift);

    dispatch({
      type: SCH_FILTER_PARAMS_UPDATE,
      payload: paramsToUpdate,
    });

    dispatch({
      type: SCHEDULE_SCREEN_CHANGE_PAGE,
      payload: {range, shift},
    });
  };
};
