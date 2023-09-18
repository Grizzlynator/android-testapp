import configDao from '../database/local-storage/configDao';
import profileDao from '../database/local-storage/profileDao';
import i18n from '../translations';

import {showErrorMsg, showSuccessMsg} from './flashMessageService';

import {authentication} from '../api/authServerAPI';
import {GUEST_PROFILE} from '../redux/reducers/initial-state/profile';

/**
 * Sign in in app as authorized user.
 * @param loginName
 * @param password
 * @returns {Promise<ProfileDTO>}
 */

export const signIn = async (loginName, password) => {
  return authentication(loginName, password)
    .then(profileDTO => onAuthSuccess(profileDTO))
    .catch(err => onAuthFailed(err));
};

const onAuthSuccess = async profileDTO => {
  await profileDao.overwrite(profileDTO);
  await configDao.updateProps({signedIn: true});
  return profileDTO;
};

const onAuthFailed = async err => {
  showErrorMsg(err.message);
  throw new Error(err.message);
};

/**
 * Sign in in application as guest.
 * @returns {Promise<ProfileDTO>}
 */

export const signInAsGuest = async () => {
  return await onAuthSuccess(GUEST_PROFILE);
};

/**
 * Sign out from application.
 * @returns {Promise<void>}
 */

export const signOut = async () => {
  await configDao.updateProps({signedIn: false});
  await profileDao.cleanStorage();
};
