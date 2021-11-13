import React from 'react'

function BackendErrorMessages({ backendErrors }) {
  const errorMessages = Object.keys(backendErrors).map(name => {
    const messages = backendErrors[name]
    return `${name} ${messages}`
  })
  return (
    <ul className="error-messages">
      {errorMessages.map(errorMessage => (
        <li key={errorMessage}>{errorMessage}</li>
      ))}
    </ul>
  )
}

export default BackendErrorMessages
