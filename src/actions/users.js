import { combineReducers } from 'redux'
import axios from 'axios'
import {
  REQUEST_USERS,
  RECEIVE_USERS,
  RECEIVE_PLANET_DETAIL,
  REQUEST_PLANET_DETAIL
} from '../constants'

export function getUsers(url) {
  return function(dispatch, getStore) {
    dispatch(fetchUsers())
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.get(url).then(response => {
      dispatch(receiveUsers(response))
    }).catch(err => {
     console.log(err)
    })

  }
}

export function getPlanets(url) {
  return function(dispatch, getStore) {
    dispatch(fetchPlanets())
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.get(url).then(response => {
      dispatch(receivePlanets(response.data))
    }).catch(err => {
     console.log(err)
    })
  }
}

export function fetchPlanets() {
  return {
    type: REQUEST_PLANET_DETAIL
  }
}


export function receivePlanets(data) {
  return {
    type: RECEIVE_PLANET_DETAIL,
    data: data,
  }
}

export function fetchUsers() {
  return {
    type: REQUEST_USERS
  }
}


export function receiveUsers(data) {
  return {
    type: RECEIVE_USERS,
    data: data,
  }
}
