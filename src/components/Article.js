import React from 'react'
import {useHistory} from 'react-router-dom'
import './Article.css'

function Article({ title, image, info, publish_date, author, id, body, originalImage }) {
  const history = useHistory()

  const selectArticle = () => {
    if (id) {
      history.push(`/articles/${id}`)
    } else {
      history.push('title')
    }
  }

  return (
    <div
      className="article"
      onClick={selectArticle}
    >
      <img src={image} alt=""/>
      <div className="article__info">
        <h3>{title}</h3>
        <p className="article__date">Published on {publish_date} by {author}</p>        
        <p className="article__desc">{info}</p>
      </div>
    </div>
  )
}

export default Article
