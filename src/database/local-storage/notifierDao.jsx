import LocalStorageDao from './LocalStorageDao';

class NotifierDao extends LocalStorageDao {
  constructor() {
    super('notifier');
  }
}

const notifierDao = new NotifierDao();

export default notifierDao;
