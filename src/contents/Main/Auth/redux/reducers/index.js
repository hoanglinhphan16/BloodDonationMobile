import * as types from '../types';

const INITIAL_STATE = {
  token: '',
  userinfo: null,
  isOnBoarding: true,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case types.SAVE_INFO:
      return {
        ...state,
        info: action.info,
      };
    case types.DELETE_ALL:
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};

export default user;
