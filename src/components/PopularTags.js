import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useFetch } from '../hooks/useFetch'

function PopularTags() {
  const apiUrl = '/tags'
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
    <div className="tag-list">
      {isLoading && <div>Loading tags...</div>}
      {error && <div>Some error...</div>}
      {!isLoading &&
        response &&
        response.tags.map(tag => (
          <Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
            {tag}
          </Link>
        ))}
    </div>
  )
}

export default PopularTags
