import axios from 'axios';

const notifierServiceAPI = axios.create({
  baseURL: 'https://services-api.tsi.lv:3002',
  timeout: 5000,
  validateStatus: () => true,
});

export const registrationRequest = async registrationDTO => {
  const response = await notifierServiceAPI.post(
    '/registration',
    registrationDTO,
  );
  return {
    data: response.data,
    status: response.status,
  };
};

export const fetchNotificationHistoryRequest = async userId => {
  const url = 'users/' + userId.toString() + '/notifications';
  const response = await notifierServiceAPI.get(url);
  return response.data;
};
