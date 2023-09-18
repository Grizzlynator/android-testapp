import fetch from '../helpers/fetchTimeout';
import i18n from '../translations';

const authenticateURL = 'https://services-api.tsi.lv:3001/users/authentication';

/**
 * Students and staffs authentication.
 * @param username
 * @param password
 * @returns {Promise<Response>} promise to user profile object
 */

export const authentication = async (username, password) => {
  const credentials = {
    username: username,
    password: password,
  };

  const authenticateRequest = {
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(credentials),
  };

  const response = await fetch(authenticateURL, authenticateRequest, 10000);
  const {status} = response;

  if (status === 401 || status === 400) {
    throw new Error(i18n.t('studentCredentialsAreIncorrect'));
  }
  if (status !== 200) {
    throw Error('Unexpected error');
  }

  return await response.json();
};
