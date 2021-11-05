import React, { useState } from 'react'
import './SignUp.css'
import { Redirect } from 'react-router-dom'

export const SignUp = ({ closeModal }) => {
  const [name, setName] = useState('jacks26')
  const [email, setEmail] = useState('anton.nozdrin.21@gmail.com')
  const [password, setPassword] = useState('315220kalter')

  const [signedUp, setSignedUp] = useState(false)

  async function signUp(name, email, password) {
    let resSignUp = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0NSysJBt4EGByzGzGz7LuID_iqXL_8kA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        return json
      })

    fetch(
      `https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/${resSignUp.localId}/tags.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify('Срочно'),
      }
    )
      .then((res) => res.json())
      .then((res) => res)

    fetch(
      `https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/${resSignUp.localId}/user_name.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(name),
      }
    )
      .then((res) => res.json())
      .then((res) => res)

    fetch(
      `https://schedule-8520f-default-rtdb.europe-west1.firebasedatabase.app/users/${resSignUp.localId}/todos.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: 'Погладить кота',
          completed: false,
          tags: ['Срочно'],
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setSignedUp(true)
      })
  }

  if (signedUp) {
    return (
      <Redirect
        to={{
          pathname: '/schedule',
        }}
      />
    )
  }
  if (!signedUp) {
    return (
      <>
        <div className="sign-up-form__block">
          <div className="sign-up-form">
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group form-button">
                <button
                  type="submit"
                  name="signup"
                  id="signup"
                  className="btn btn-lg btn-primary btn-primary"
                  value="Register"
                  onClick={(e) => {
                    e.preventDefault()
                    signUp(name, email, password)
                  }}
                >
                  Register
                </button>
              </div>
              <button
                type="button"
                className="add-todo-form__close"
                onClick={closeModal}
              >
                <svg>
                  <use xlinkHref="#add" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}
