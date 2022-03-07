import * as types from '../types';

export const showOnBoarding = () => dispatch => {
  dispatch({
    type: types.SHOW_ONBOARDING,
  });
};
