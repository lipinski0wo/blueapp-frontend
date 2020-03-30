import React, { Fragment } from 'react'
import Users from './components/users/Users'
import User from './components/user/User'
import Post from './components/post/Post'
import Fixed from './components/fixed/Fixed'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Users} />
            <Route exact path='/user/:id' component={User} />
            <Route exact path='/user/:userId/:postId' component={Post} />
            <Route render={() => <Redirect to='/' />} />
          </Switch>
          <Fixed />
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
