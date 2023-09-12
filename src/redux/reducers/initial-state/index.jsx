import initConfigState from './appConfig';

const initialState = async () => {
  const appConfig = await initConfigState();

  return {
    appConfig,
  };
};

export default initialState;
