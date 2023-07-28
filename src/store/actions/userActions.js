import { SET_USER, SET_IS_AUTH } from '../../constants/actionsRedux';

export const setUserAction = (payload) => ({
  type: SET_USER,
  payload,
});

export const setIsAuthAction = (payload) => ({
  type: SET_IS_AUTH,
  payload,
});
