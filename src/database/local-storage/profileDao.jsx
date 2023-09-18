import LocalStorageDao from './LocalStorageDao';

class ProfileDao extends LocalStorageDao {
  constructor() {
    super('profile');
  }
}

const profileDao = new ProfileDao();

export default profileDao;
