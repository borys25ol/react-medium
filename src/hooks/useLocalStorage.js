import React, { useEffect } from 'react'

export const useLocalStorage = (key, initialValue = '') => {
  const [value, setValue] = React.useState(() => {
    return localStorage.getItem(key) || initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, value.toString())
  }, [key, value])

  return [value, setValue]
}
