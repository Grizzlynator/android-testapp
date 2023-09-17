import _ from 'lodash';

/**
 * Extract values from key-value data
 * @param scheduleItems - raw key-value data from server. (classrooms, groups and lecturers)
 * @returns {{rooms: [], lecturers: [], groups: []}} - Returns all possible names of classrooms, groups and lecturers values
 */
export const extractSortedScheduleItemValues = scheduleItems => {
  if (_.isEmpty(scheduleItems)) {
    return {rooms: [], lecturers: [], groups: []};
  }
  const {rooms, teachers, groups} = scheduleItems;
  return {
    rooms: getSortedItemValues(rooms),
    lecturers: getSortedItemValues(teachers),
    groups: getSortedItemValues(groups),
  };
};

const getSortedItemValues = item => {
  if (_.isEmpty(item)) {
    return [];
  }
  const values = Object.values(item);
  return values.sort();
};
