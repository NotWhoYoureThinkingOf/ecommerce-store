import React from 'react'
import {Link} from 'react-router-dom'
import './Release.css'

function Release({ name, release_date }) {
  return (
    <Link to="/articles" className="release">
      <div className="release__left">
        <h4>{name}</h4>
        <p>Release date: {release_date}</p>
      </div>
    </Link>
  )
}

export default Release
