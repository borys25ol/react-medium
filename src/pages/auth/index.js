import React, { useContext, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { useFetch } from '../../hooks/useFetch'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { CurrentUserContext } from '../../contexts/currentUser'
import BackendErrorMessages from '../../components/BackendErrorMessage'

function Authentication(props) {
  const isLogin = props.location.pathname === '/login'
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
  const descriptionLink = isLogin ? '/register' : '/login'
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
  const apiUrl = isLogin ? '/users/login' : '/users'

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isSuccessSubmit, setIsSuccessSubmit] = React.useState(false)
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl)
  const [, setToken] = useLocalStorage('token')
  const [, dispatch] = useContext(CurrentUserContext)

  const handleSubmit = event => {
    event.preventDefault()
    const user = isLogin ? { email, password } : { username, email, password }
    doFetch({
      method: 'post',
      data: {
        user,
      },
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }
    setToken(response.user.token)
    setIsSuccessSubmit(true)
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
  }, [response, setToken, dispatch])

  if (isSuccessSubmit) {
    return <Redirect to="/" />
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              {error && <BackendErrorMessages backendErrors={error.errors} />}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      placeholder="Username"
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication
