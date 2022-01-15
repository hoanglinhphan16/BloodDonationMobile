import * as types from '../types'

export const showOnBoarding = () => dispatch => {
  dispatch({
    type: types.SHOW_ONBOARDING
  })
}

export const deleteAllData = () => dispatch => {
  dispatch({
    type: types.DELETE_ALL
  })
}



