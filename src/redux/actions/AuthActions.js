import { GET_NO_AUTH, GET_USER } from './types';

export const getNoAuth = () => ({
  type: GET_NO_AUTH
});

export const getUser = user => ({
  type: GET_USER,
  payload: user
});
