import LocalStorageDao from './LocalStorageDao';

class ConfigDao extends LocalStorageDao {
  constructor() {
    super('app-config');
  }
}

const configDao = new ConfigDao();

export default configDao;
