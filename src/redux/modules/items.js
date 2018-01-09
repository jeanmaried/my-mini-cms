const GET_NO_AUTH = 'GET_NO_AUTH';
const GET_USER = 'GET_USER';

export const getNoAuth = () => ({
  type: GET_NO_AUTH
});

export const getUser = user => ({
  type: GET_USER,
  payload: user
});

export default (state = { authenticated: false, userInfo: {} }, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, authenticated: true, userInfo: action.payload };
    case GET_NO_AUTH:
      return { ...state, authenticated: false, userInfo: null };
    default:
      return state;
  }
};
