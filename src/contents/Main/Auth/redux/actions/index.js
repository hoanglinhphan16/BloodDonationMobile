import * as types from '../types'

export const saveToken = token => dispatch => {
  dispatch({
    type: types.SAVE_TOKEN,
    token
  })
}

export const saveUserinfo = userinfo => dispatch => {
  dispatch({
    type: types.SAVE_USERINFO,
    userinfo
  })
}


