import moment from 'moment';
import {withCapitalLetter} from '../helpers/StringHelpers';

export const convertToSectionListFormat = (events, items) => {
  let lastDayDate = '';
  let eventsArray = [];

  events.events.values.forEach(event => {
    const date = moment.unix(event[0]).utc().format('dddd,  DD/MM/YYYY');
    const time = moment.unix(event[0]).utc().format('HH:mm');

    const room = items.rooms[event[1][0]];
    const lecturer = items.teachers[event[3]];
    const name = event[4];
    const comment = event[5];
    const type = event[6];

    const link = findURL(comment);

    const groups = event[2].map(groupId => items.groups[groupId]);
    const nextEvent = {
      date,
      time,
      room,
      lecturer,
      name,
      comment,
      type,
      link,
      groups,
    };

    if (lastDayDate.localeCompare(date)) {
      let title = moment.unix(event[0]).utc().format('dddd  DD/MM/YYYY');
      title = withCapitalLetter(title);
      eventsArray.push({title: title, data: [nextEvent]});
      lastDayDate = nextEvent.date;
    } else {
      const lastDay = eventsArray.length - 1;
      eventsArray[lastDay].data.push(nextEvent);
    }
  });
  return eventsArray;
};

const findURL = comment => {
  const urlExpression = /(https?:\/\/[^\s]+)/g;
  return urlExpression.exec(comment);
};
