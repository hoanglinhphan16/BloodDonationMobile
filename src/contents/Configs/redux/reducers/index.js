import * as types from '../types';

const INITIAL_STATE = {
  isOnBoarding: true,
};

const config = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SHOW_ONBOARDING:
      return {
        ...state,
        isOnBoarding: false,
      };

    default:
      return state;
  }
};

export default config;
