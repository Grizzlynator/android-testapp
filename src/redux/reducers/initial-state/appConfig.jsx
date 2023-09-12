import configDao from '../../../database/local-storage/configDao';
import _ from 'lodash';

export const DEFAULT_CONFIG = {
  signedIn: false,
  language: 'en',
};

const config = async () => {
  const appConfig = await configDao.get();
  if (_.isEmpty(appConfig)) {
    await configDao.overwrite(DEFAULT_CONFIG);
    return DEFAULT_CONFIG;
  }

  return appConfig;
};

export default config;
