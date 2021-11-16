import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { useLocalStorage } from './useLocalStorage'

export const useFetch = endpoint => {
  const baseUrl = 'https://api.realworld.io/api'
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const [token] = useLocalStorage('token')

  const doFetch = useCallback((options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: { authorization: token ? `Token ${token}` : '' },
      },
    }
    if (!isLoading) {
      return
    }
    axios(baseUrl + endpoint, requestOptions)
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
  }, [isLoading, options, endpoint, token])

  return [{ isLoading, response, error }, doFetch]
}
