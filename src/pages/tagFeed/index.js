import React, { useEffect } from 'react'
import { stringify } from 'query-string'

import { useFetch } from '../../hooks/useFetch'
import { getPaginator, limit } from '../../utils'
import Feed from '../../components/Feed'
import Pagination from '../../components/Pagination'
import PopularTags from '../../components/PopularTags'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import FeedToggler from '../../components/FeedToggler'

function TagFeed({ location, match }) {
  const tagName = match.params.slug
  const { currentPage, offset } = getPaginator(location.search)
  const stringifyParams = stringify({
    limit,
    offset,
    tag: tagName,
  })
  const apiUrl = `/articles?${stringifyParams}`
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage, tagName])

  if (isLoading || !response) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage />
  }

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={tagName} />
            <Feed articles={response.articles} />
            {response.articlesCount > limit && (
              <Pagination
                total={response.articlesCount}
                limit={limit}
                url={match.url}
                currentPage={currentPage}
              />
            )}
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagFeed
