import LocalStorageDao from './LocalStorageDao';

class FilterConfigDao extends LocalStorageDao {
  constructor() {
    super('filter-config');
  }
}

const filterConfigDao = new FilterConfigDao();

export default filterConfigDao;
