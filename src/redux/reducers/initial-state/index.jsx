import initConfigState from './appConfig';
import initNewsState from './news';

const initialState = async () => {
  const appConfig = await initConfigState();
  const news = await initNewsState();

  return {
    appConfig,
    news: news,
  };
};

export default initialState;
