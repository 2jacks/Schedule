import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from './features/user/userSlice'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import './App.css'

import { TagBar } from './features/tags/TagBar/TagBar'
import { TodosList } from './features/todos/TodosList/TodosList'
import { SignIn } from './features/user/SignIn/SignIn'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect
            to={{
              pathname: '/schedule',
            }}
          />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <PrivateRoute path="/schedule" />
      </Switch>
    </Router>
  )
}

function PrivateRoute({ rest }) {
  const user = useSelector(selectUser)
  return (
    <Route
      {...rest}
      render={() =>
        user ? (
          <div className="screen">
            <>
              <TagBar />
              <TodosList />
            </>
          </div>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  )
}

export default App
