import LocalStorageDao from './LocalStorageDao';

class FavoriteContactsDao extends LocalStorageDao {
  constructor() {
    super('favorite-contacts');
  }
}

const favoriteContactsDao = new FavoriteContactsDao();

export default favoriteContactsDao;
