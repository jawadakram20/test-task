import {
  RECEIVE_PLANET_DETAIL,
  REQUEST_PLANET_DETAIL
} from '../constants'


export function planet(state = {}, action) {
  switch (action.type) {
    case REQUEST_PLANET_DETAIL:
      return {
        isLoading: true
      }
    case RECEIVE_PLANET_DETAIL:
      return {
        isLoading: false,
        data: action.data
      }
    default:
      return state
  }
}
