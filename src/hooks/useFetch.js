import React, { useEffect } from 'react'
import axios from 'axios'

export const useFetch = endpoint => {
  const baseUrl = 'https://api.realworld.io/api'
  const [isLoading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [options, setOptions] = React.useState({})

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }

  useEffect(() => {
    if (!isLoading) {
      return
    }
    axios(baseUrl + endpoint, options)
      .then(res => {
        console.log('success')
        setIsLoading(false)
        setResponse(res.data)
      })
      .catch(error => {
        console.log('error')
        setIsLoading(false)
        setError(error.response.data)
      })
  }, [isLoading, options, endpoint])

  return [{ isLoading, response, error }, doFetch]
}
