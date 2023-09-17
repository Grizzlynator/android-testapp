import {APP_CONFIG_LANGUAGE_CHANGE} from '../types';

import {changeLanguage} from '../../../workers/LocaleService';
import appConfigDao from '../../../database/local-storage/configDao';

/**
 * Change application language.
 * @param lang
 */
export const setAppLanguage = lang => {
  return (dispatch, getState) => {
    changeLanguage(lang);
    appConfigDao.updateProps({language: lang});
    dispatch({
      type: APP_CONFIG_LANGUAGE_CHANGE,
      payload: lang,
    });
  };
};
