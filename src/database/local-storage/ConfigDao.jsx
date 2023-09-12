import LocalStorageDao from './LocalStorageDao.jsx';

class FastNavigationDao extends LocalStorageDao {
  constructor() {
    super('fast-navigation');
  }
}

const fastNavigationDAO = new FastNavigationDao();

export default fastNavigationDAO;
