import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const newHistory = createBrowserHistory();
import { store } from './store'
import User from './users.jsx'

import {
  getUsers,
} from './actions'

store.dispatch(getUsers('https://swapi.co/api/people/'))

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={newHistory}>
		<Route path="/" component={User}></Route>
    </Router>
  </Provider>
  , document.getElementById('container'))


  store.subscribe(() => {
  })
