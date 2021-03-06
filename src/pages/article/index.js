import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useFetch } from '../../hooks/useFetch'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import TagList from '../../components/TagList'

function Article(props) {
  const slug = props.match.params.slug
  const apiUrl = `/articles/${slug}`
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1 className="ng-binding">{response.article.title}</h1>
            <div className="article-meta">
              <Link href={`/profile/${response.article.author.username}`}>
                <img src={response.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link className="author" href={`/profile/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loading />}
        {error && <ErrorMessage />}
        {!isLoading && response && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{response.article.body}</p>
              </div>
              <TagList tags={response.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article
