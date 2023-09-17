import i18n from '../translations';
import moment from 'moment';

import 'moment/locale/de';
import 'moment/locale/lv';
import 'moment/locale/ru';

export const changeLanguage = lang => {
  i18n.locale = lang;
  moment.locale(lang);
};
