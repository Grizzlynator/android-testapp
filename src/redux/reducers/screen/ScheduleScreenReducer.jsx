import {
  SCHEDULE_SCREEN_CHANGE_PAGE,
  SCHEDULE_SCREEN_IS_FILTER_OPEN,
  SCHEDULE_SCREEN_OVERLAY_VISIBLE,
} from '../../actions/types';

const INITIAL_STATE = {
  page: {
    range: 'day',
    shift: 0,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHEDULE_SCREEN_CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
};
