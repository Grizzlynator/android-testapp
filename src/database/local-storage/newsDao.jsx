import LocalStorageDao from './LocalStorageDao';

class NewsDao extends LocalStorageDao {
  constructor() {
    super('news');
  }
}

const newsDao = new NewsDao();

export default newsDao;
