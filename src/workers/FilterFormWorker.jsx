export const validateFilterForm = (filter, validFilterValues) => {
  const {group, room, lecturer} = filter;
  const {groups, rooms, lecturers} = validFilterValues;
  const invalidInput = [];

  const result = {
    group: isValueValid(group, groups),
    room: isValueValid(room, rooms),
    lecturer: isValueValid(lecturer, lecturers),
  };

  for (let [key, value] of Object.entries(result)) {
    if (!value) {
      invalidInput.push(key);
    }
  }

  return invalidInput;
};

const isValueValid = (value, allowableValue) => {
  if (value === '') {
    return true;
  }
  return (
    allowableValue
      .map(item => item.toLowerCase())
      .indexOf(value.toLowerCase()) !== -1
  );
};

/**
 *
 * @param filterFormInputs - schedule filter form input values
 * @returns {boolean} - true if filter is not defined.
 */
export const isFilterFormEmpty = filterFormInputs => {
  const {group, room, lecturer} = filterFormInputs;
};
