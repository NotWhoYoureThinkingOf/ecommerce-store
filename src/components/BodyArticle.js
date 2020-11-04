import React from 'react'
import './BodyArticle.css'
import {useHistory} from 'react-router-dom'

function BodyArticle({ title, image, id }) {

  const history = useHistory()

  const selectArticle = () => {
    if (id) {
      history.push(`/articles/${id}`)
    } else {
      history.push('title')
    }
  }

  return (
    <div className="bodyArticle" onClick={selectArticle}>
      <img src={image} alt=""/>
      <h3>{title}</h3>        
    </div>
  )
}

export default BodyArticle
