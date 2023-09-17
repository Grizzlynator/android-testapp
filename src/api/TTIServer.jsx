import fetch from '../helpers/fetchTimeout';
import {contactsServiceURL} from '../configs/URL';
import * as rssParser from 'react-native-rss-parser';
import {parse} from '../tools/xmlParser';

const parseInJson = async response => {
  const xml = await response.text();
  const xmlObj = await parse(xml);
  const json = xmlObj.string._;
  return JSON.parse(json);
};

/**
 * Fetch id-value map for lecturer, room and group items.
 * @returns {Promise<void>} Promise to object.
 */

export const fetchServiceData = async () => {
  const url = 'http://services.tsi.lv/schedule/api/service.asmx/GetItems';
  const headers = {'Content-Type': 'xml; charset=utf-8'};
  const option = {method: 'GET', headers: headers};
  const response = await fetch(url, option, 7000);
  return await parseInJson(response);
};

/**
 * Fetch schedule events in raw format.
 * @param filter - timetable filter object
 * @param language - ru | lv | en
 * @param timeout - default 7000 ms
 * @returns {Promise} - Promise to raw events data.
 */

export const fetchScheduleEvents = async (filter, language, timeout) => {
  const option = {
    method: 'GET',
    headers: {Accept: 'text', 'Content-Type': 'text'},
  };
  const url =
    'http://services.tsi.lv/schedule/api/service.asmx/GetLocalizedEvents?' +
    'from=' +
    filter.fromDate +
    '&' +
    'to=' +
    filter.toDate +
    '&' +
    'teachers=' +
    filter.lecturer.id +
    '&' +
    'rooms=' +
    filter.room.id +
    '&' +
    'groups=' +
    filter.group.id +
    '&' +
    'lang=' +
    language;

  const response = await fetch(url, option, 9000);
  return await parseInJson(response);
};

export const fetchRSSNews = (timeout, language) => {
  const url = 'https://www.tsi.lv/' + language + '/rss';
  return new Promise(function (resolve, reject) {
    fetch(url, {}, timeout)
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(news => {
        resolve(news);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const fetchRSSNewsEng = timeout => {
  const url = 'https://tsi.lv/feed/';
  return new Promise(function (resolve, reject) {
    fetch(url, {}, timeout)
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(news => resolve(news))
      .catch(error => {
        reject(error);
      });
  });
};

// Duplicate code 01
export const fetchContactList = (timeout, lang = 'en') => {
  const language = 'local=' + lang;
  const url =
    contactsServiceURL + '/contacts?searchOption=BRIEF_INFO&' + language;
  return new Promise(function (resolve, reject) {
    fetch(url, {}, timeout)
      .then(response => response.json())
      .then(responseData => resolve(responseData))
      .catch(error => {
        reject(error);
      });
  });
};

// Duplicate code 01
export const fetchContact = (timeout, id) => {
  const url = contactsServiceURL + '/contacts/' + id;
  return new Promise(function (resolve, reject) {
    fetch(url, {}, timeout)
      .then(response => response.json())
      .then(responseData => resolve(responseData))
      .catch(error => {
        reject(error);
      });
  });
};
