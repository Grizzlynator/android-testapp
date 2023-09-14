import {I18n} from 'i18n-js';

import en from './locales/en';
import ru from './locales/ru';
import lv from './locales/lv';

const translations = {en: en, lv: lv, ru: ru};

const i18n = new I18n(translations);
i18n.defaultLocale = 'ru';
i18n.enableFallback = 'true';

export default i18n;
