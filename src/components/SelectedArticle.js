import React from 'react'
import './SelectedArticle.css'
import { motion } from "framer-motion";

function SelectedArticle({ image, title, info, author, publish_date, body }) { 

  return (
    <motion.div 
      className="selectedArticle" 
    >
      <img src={image} alt=""/>
      <div className="selectedArticle__container">
        <h2>{title}</h2>
        <h3 className="selectedArticle__subtitle">{info}</h3>
        <h3>Written by {author}</h3>
        <p className="selectedArticle__date">Published on {publish_date}</p>
        <span>
          <div dangerouslySetInnerHTML={{ __html: body}} className="selectedArticle__body" id="bodyText"></div>
        </span>        
      </div>
    </motion.div>
  )
}

export default SelectedArticle