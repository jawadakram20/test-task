import { combineReducers } from 'redux'
import { planet } from './planet'
import { users } from './users'

const rootReducer = combineReducers({ users, planet })

export default rootReducer
