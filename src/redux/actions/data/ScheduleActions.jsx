import {
  fetchScheduleEvents as fetchSchedule,
  fetchServiceData,
} from '../../../api/TTIServer';

import {
  SCHEDULE_ITEMS_FETCH,
  SCHEDULE_ITEMS_FETCH_SUCCESS,
  SCHEDULE_ITEMS_FETCH_FAIL,
  SCHEDULE_EVENTS_FETCH,
  SCHEDULE_EVENTS_FETCH_SUCCESS,
  SCHEDULE_EVENTS_FETCH_FAIL,
  SCH_FILTER_FORM_DROP_DOWN_UPDATE,
} from '../types';

import {convertToSectionListFormat} from '../../../converters/EventsConverter';
import {extractSortedScheduleItemValues} from '../../../workers/ScheduleWorker';

/**
 * Fetch id to value maps for lecturers, room and groups.
 */

export const fetchScheduleItems = () => {
  return dispatch => {
    dispatch({type: SCHEDULE_ITEMS_FETCH});
    fetchServiceData()
      .then(data => onScheduleItemsFetchSuccess(dispatch, data))
      .catch(err => onScheduleItemsFetchFail(dispatch, err));
  };
};

const onScheduleItemsFetchSuccess = (dispatch, data) => {
  const serviceDataValues = extractSortedScheduleItemValues(data);

  dispatch({
    type: SCHEDULE_ITEMS_FETCH_SUCCESS,
    payload: data,
  });

  dispatch({
    type: SCH_FILTER_FORM_DROP_DOWN_UPDATE,
    payload: serviceDataValues,
  });
};

const onScheduleItemsFetchFail = (dispatch, error) => {
  dispatch({
    type: SCHEDULE_ITEMS_FETCH_FAIL,
    payload: error.message,
  });
};

/**
 * Fetch schedule and convert schedule events in correct formant.
 * @param filter - timetable filter
 * @param language - lv | ru | en
 */

export const fetchScheduleEvents = (filter, language) => {
  return async (dispatch, state) => {
    dispatch({type: SCHEDULE_EVENTS_FETCH});
    fetchSchedule(filter, language, 7000)
      .then(events => onScheduleEventsFetchSuccess(dispatch, state, events))
      .catch(error => onScheduleEventsFetchFail(dispatch, error));
  };
};

const onScheduleEventsFetchSuccess = (dispatch, state, events) => {
  try {
    const {items} = state().scheduleItems;
    const schedule = convertToSectionListFormat(events, items);
    dispatch({
      type: SCHEDULE_EVENTS_FETCH_SUCCESS,
      payload: schedule,
    });
  } catch (e) {
    onScheduleEventsFetchFail(
      dispatch,
      new Error('Error processing schedule events.'),
    );
  }
};

const onScheduleEventsFetchFail = (dispatch, error) => {
  dispatch({
    type: SCHEDULE_EVENTS_FETCH_FAIL,
    payload: error.message,
  });
};
