import React from 'react'
import { Link } from 'react-router-dom'

import TagList from './TagList'

function Feed({ articles }) {
  return (
    <div>
      {articles.map((article, index) => {
        return (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link className="author" to={`/profile/${article.author.username}`}>
                  {article.author.username}
                </Link>
                <span className="date">{article.createdAt}</span>
              </div>
            </div>
            <Link className="preview-link" to={`/articles/${article.slug}`}>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
              <TagList tags={article.tagList} />
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Feed
