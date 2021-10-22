import React, { useState } from 'react'
import './SignIn.css'

import { useDispatch, useSelector } from 'react-redux'
import { selectUser, signIn } from '../userSlice'
import { addNewTodo } from '../../todos/todosSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Redirect } from 'react-router-dom'

export const SignIn = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectUser)

  const [email, setEmail] = useState('anton.nozdrin.21@gmail.com')
  const [password, setPassword] = useState('315220kalter')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState(() => {
    if (currentUser) {
      return !currentUser.error
    }
    return null
  })

  const [loginRequestStatus, setLoginRequestStatus] = useState('idle')
  const canLogin =
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    loginRequestStatus === 'idle'

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }
  async function logIn(e, email, password) {
    e.preventDefault()
    // let res = await fetch(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0NSysJBt4EGByzGzGz7LuID_iqXL_8kA',
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //       returnSecureToken: true,
    //     }),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json.error) {
    //       setError(true)
    //     } else {
    //       setError(false)
    //       setCredentials(json)
    //     }
    //   })
    if (canLogin) {
      try {
        setLoginRequestStatus('pending')
        const resultAction = await dispatch(
          signIn({ email, password }) // there was 'remind' parameter
        )
        unwrapResult(resultAction)
      } catch (err) {
        return <span>err</span>
      } finally {
        setLoginRequestStatus('idle')
      }
    }
  }
  if (currentUser && !currentUser.error) {
    return (
      <Redirect
        to={{
          pathname: '/schedule',
        }}
      />
    )
  }
  return (
    <main className="form-signin">
      <div className="logo mb-3 align-self-center">SCHEDULE</div>
      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={onEmailChange}
            value={email}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={onPasswordChange}
            value={password}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input
              type="checkbox"
              value="remember-me"
              checked={rememberMe}
              onChange={() => {
                setRememberMe(!rememberMe)
              }}
            />{' '}
            Remember me
          </label>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          onClick={(e) => logIn(e, email, password)}
          disabled={!canLogin}
        >
          Sign in
        </button>
      </form>
      <span>{error ? 'Что-то пошло не так' : 'Успешно'}</span>
    </main>
  )
}
