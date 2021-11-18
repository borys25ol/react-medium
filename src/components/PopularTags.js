import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useFetch } from '../hooks/useFetch'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

function PopularTags() {
  const apiUrl = '/tags'
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (isLoading || !response) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage />
  }

  return (
    <div className="tag-list">
      {response.tags.map(tag => (
        <Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default PopularTags
