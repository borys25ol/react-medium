import React from 'react'
import { Link } from 'react-router-dom'

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
            <Link className="preview-link" to={`/profile/${article.slug}`}>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
              <ul className="tag-list">
                {article.tagList.map(tag => (
                  <li key={tag} className="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Feed
