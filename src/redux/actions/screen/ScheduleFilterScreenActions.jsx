import {
  SCHEDULE_FILTER_FORM_INPUT_UPDATE,
  SCH_FILTER_FORM_PARAMS_NOT_DEFINED,
  SCH_FILTER_FORM_PARAMS_SAVE_SUCCESS,
  SCH_FILTER_FORM_PARAMS_ERROR,
} from '../types';

import _ from 'lodash';
import filterConfigDao from '../../../database/local-storage/filterConfigDao';
import {validateFilterForm} from '../../../workers/FilterFormWorker';
import {getKeyByValue, isEveryPropEmpty} from '../../../helpers/ObjectHelpers';

/**
 * Update form input state
 */

export const scheduleFilterFormInputsUpdate = inputsToUpdate => {
  return {
    type: SCHEDULE_FILTER_FORM_INPUT_UPDATE,
    payload: inputsToUpdate,
  };
};

/**
 * Reset schedule filter form inputs.
 */

export const resetFilterForm = () => {
  const emptyInputs = {group: '', room: '', lecturer: ''};
  return {
    type: SCHEDULE_FILTER_FORM_INPUT_UPDATE,
    payload: emptyInputs,
  };
};

/**
 * Save user filter if parameters is valid.
 */

export const saveUserFilterIfValid = () => {
  return (dispatch, state) => {
    const {inputValues, dropDownValues: allowableValues} =
      state().scheduleFilterForm;
    if (isEveryPropEmpty(inputValues)) {
      dispatch({type: SCH_FILTER_FORM_PARAMS_NOT_DEFINED});
    } else {
      const invalidInputs = validateFilterForm(inputValues, allowableValues);
      _.isEmpty(invalidInputs)
        ? onValidFilter(dispatch, state, inputValues)
        : onFilterWithErrors(dispatch, invalidInputs);
    }
  };
};

const onValidFilter = async (dispatch, state, parameters) => {
  const {items} = state().scheduleItems;
  const {groups, rooms, teachers} = items;

  const {group, lecturer, room} = parameters;

  const dataToSave = {
    group: {name: group, id: getKeyByValue(groups, group)},
    lecturer: {name: lecturer, id: getKeyByValue(teachers, lecturer)},
    room: {name: room, id: getKeyByValue(rooms, room)},
  };

  await filterConfigDao.overwrite(dataToSave);
  dispatch({
    type: SCH_FILTER_FORM_PARAMS_SAVE_SUCCESS,
    payload: dataToSave,
  });
};

const onFilterWithErrors = (dispatch, invalidInputs) => {
  dispatch({
    type: SCH_FILTER_FORM_PARAMS_ERROR,
    payload: invalidInputs,
  });
};

/**
 * Displays the current filter settings in the form
 */

export const showActiveFilter = () => {
  return (dispatch, state) => {
    const {group, lecturer, room} = state().scheduleFilter;
    dispatch({
      type: SCHEDULE_FILTER_FORM_INPUT_UPDATE,
      payload: {
        group: group.name,
        lecturer: lecturer.name,
        room: room.name,
      },
    });
  };
};
