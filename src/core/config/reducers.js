import { combineReducers } from 'redux'
import { toastReducer as toast } from 'react-native-redux-toast'
import user from '@mains/Auth/redux/reducers'
import config from '@contents/Configs/redux/reducers'
import { pick } from 'lodash'

const appReducers = combineReducers({
  toast, user, config
})

const rootReducer = (state, action) => {
  if (action.type === 'DELETE_ALL') {
    console.log('heloooo')
    global.token = ''
    global.user = {}
    state = pick(state, [config])
  }
  return appReducers(state, action)
}

export default rootReducer
