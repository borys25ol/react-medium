import { useContext, useEffect } from 'react'

import { useFetch } from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CurrentUserContext } from '../contexts/currentUser'

function CurrentUserChecker({ children }) {
  const [token] = useLocalStorage('token')
  const [{ response }, doFetch] = useFetch('/user')
  const [, dispatch] = useContext(CurrentUserContext)

  useEffect(() => {
    if (!token) {
      dispatch({ type: 'SET_UNAUTHORIZED' })
    }
    doFetch({
      method: 'get',
    })
    dispatch({ type: 'LOADING' })
  }, [token, doFetch, dispatch])

  useEffect(() => {
    if (!response) {
      return
    }
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
  }, [response, dispatch])

  return children
}

export default CurrentUserChecker
