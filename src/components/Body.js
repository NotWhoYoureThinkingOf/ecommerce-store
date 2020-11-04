import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import './Body.css'
import BodyArticle from './BodyArticle'
import MainArticle from './MainArticle'
import {useStateValue} from './StateProvider'
import { motion } from "framer-motion";

function Body() {
  const [{pulled_articles}] = useStateValue()
  const [{loading}] = useStateValue()
  const {articleId} = useParams()

  const pageChange = {
    in: {
      x:'0%',
      opacity:"100%"
    },
    out: {
      x: '100vw',
      opacity:"0%"
    },
    done: {
      x: '-100vw',
      opacity:"0%"
    }
  }

  const pageTransition = {
    type: "spring",
    stiffness: 50,
    duration:"0.1"
  }

  return (
    <motion.div 
      className="body" 
      exit="done" 
      animate="in" 
      initial="out" 
      variants={pageChange}
      transition={pageTransition}
    >
      <div className="body__left">
        {loading ? (
          <h3>Loading</h3>
        ) : (
          pulled_articles?.slice(6,7).map((article) => (
            <MainArticle
              title={article.title}
              image={article.image.original}
              id={article.id}
              articleId={articleId}
              key={article.id}
            />
          ))
        )}
        
      </div>
      <div className="body__right">
        <div className="body__rightTop">
        {loading ? (
          <h3>Loading</h3>
        ) : (
          pulled_articles?.slice(7,8).map((article) => (
            <BodyArticle 
              title={article.title}
              image={article.image.original}
              id={article.id}
              articleId={articleId}
              key={article.id}
            />
          ))
        )}
        </div>
        <div className="body__rightBottom">
        {loading ? (
          <h3>Loading</h3>
        ) : (
          pulled_articles?.slice(8,9).map((article) => (
            <BodyArticle 
              title={article.title}
              image={article.image.original}
              id={article.id}
              articleId={articleId}
              key={article.id}
            />
          ))
        )}
        </div>
      </div>
    </motion.div>
  )
}

export default Body
