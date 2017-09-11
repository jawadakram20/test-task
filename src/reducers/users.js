import {
  REQUEST_USERS,
  RECEIVE_USERS,
} from '../constants'


export function users(state = {}, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        isLoading: true
      }
    case RECEIVE_USERS:
      return {
        isLoading: false,
        users: action.data
      }
    default:
      return state
  }
}
