import { useContext, useEffect } from 'react'

import { useFetch } from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CurrentUserContext } from '../contexts/currentUser'

function CurrentUserChecker({ children }) {
  const [token] = useLocalStorage('token')
  const [{ response }, doFetch] = useFetch('/user')
  const [, setCurrentUserState] = useContext(CurrentUserContext)

  useEffect(() => {
    if (!token) {
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: false,
      }))
      return
    }
    doFetch({
      method: 'get',
    })
    setCurrentUserState(state => ({
      ...state,
      isLoading: true,
    }))
  }, [token, doFetch, setCurrentUserState])

  useEffect(() => {
    if (!response) {
      return
    }
    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }))
  }, [response, setCurrentUserState])

  return children
}

export default CurrentUserChecker
