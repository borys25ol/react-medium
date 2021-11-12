import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Authentication() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    setIsSubmitting(true)
  }
  useEffect(() => {
    if (!isSubmitting) {
      return
    }
    axios('https://conduit.productionready.io/api/users/login', {
      method: 'post',
      data: {
        user: {
          email,
          password,
        },
      },
    })
      .then(res => {
        console.log('success')
        setIsSubmitting(false)
      })
      .catch(error => {
        setIsSubmitting(false)
        console.log('success')
      })
  })
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
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
                  disabled={isSubmitting}
                >
                  Sign in
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
