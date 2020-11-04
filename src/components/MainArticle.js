import React from 'react'
import './MainArticle.css'
import {useHistory} from 'react-router-dom'

function MainArticle({ title, image, id }) {

  const history = useHistory()

  const selectArticle = () => {
    if (id) {
      history.push(`/articles/${id}`)
    } else {
      history.push('title')
    }
  }

  return (
    <div className="mainArticle" onClick={selectArticle}>
      <img src={image} alt=""/>
      <h3>{title}</h3>        
    </div>
  )
}

export default MainArticle