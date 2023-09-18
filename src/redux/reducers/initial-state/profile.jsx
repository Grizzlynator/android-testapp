import ProfileDao from '../../../database/local-storage/profileDao';
import _ from 'lodash';

export const GUEST_PROFILE = {
  displayName: 'Guest',
  status: 'guest',
  group: '',
  email: '',
};

const profile = async () => {
  const userProfile = await ProfileDao.get();
  if (_.isEmpty(userProfile)) {
    await ProfileDao.overwrite(GUEST_PROFILE);
    return GUEST_PROFILE;
  }

  return userProfile;
};

export default profile;
