import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import {apiMiddleware} from 'redux-api-middleware'
import interceptor from '@core/network/api_interceptor'
import rootReducer from './reducers'
import {ToastActionsCreators} from 'react-native-redux-toast'

// type AppState = ReturnType<typeof rootReducer>;

const createStoreWithMiddleware = applyMiddleware(
  interceptor({
    onRequestError: (state, response) => {
      console.log('onRequestError response', response)
      if (
        (response.status_code !== 200 || response.status_code !== 201) &&
        response.error
      ) {
        const message =
          response.error?.message ||
          (response.error?.validationErrors || []).length
            ? response.error.validationErrors[0].message
            : null
        if (message) {
          dispatch(ToastActionsCreators.displayError(message))
        }
      } else if (response.status_code === 401 && state.user.token) {
        // logout()
      }
    },
    headers: (origHeaders, state) => {
      if (Object.entries(origHeaders).length === 0 && state.user.token) {
        return {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.token}`
        }
      } else {
        return origHeaders
      }
    }
  }),
  thunk,
  apiMiddleware,
)(createStore)

function configureStore() {
  return createStoreWithMiddleware(rootReducer)
}

const store = configureStore()

const {dispatch} = store

// function logout() {
//   Promise.all([
//     dispatch(saveToken('')),
//     dispatch(ToastActionsCreators.displayError('ERROR: token'))
//   ]).then(() => {
//     NavigationService.navigateAndReset(Routes.LOGIN_SCREEN)
//   })
// }

export default store
