import React, {useEffect, useState} from 'react'
import {useStateValue} from './StateProvider';
import './ArticlePage.css'
import SelectedArticle from './SelectedArticle';
import {useParams} from 'react-router-dom'
import { motion } from "framer-motion";

function ArticlePage() {
  const {articleId} = useParams()
  const [selectedArticle, setSelectedArticle] = useState({})
  const [{pulled_articles}] = useStateValue()

  useEffect(() => {
    for(const article of pulled_articles){
      if(article.id == articleId){
        setSelectedArticle(article)
      }
    }

    if (window.scrollY) {
      window.scroll(0, 0);  
    }
    
  }, [articleId])

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
      className="articlePage" 
      exit="done" 
      animate="in" 
      initial="out"
      variants={pageChange}
      transition={pageTransition}
    >
      {(!articleId) ? (
        <h1>No article selected</h1>
      ) : (
        <SelectedArticle
          key={selectedArticle.id} 
          image={selectedArticle?.image?.original}
          title={selectedArticle.title}
          info={selectedArticle.deck} 
          author={selectedArticle.authors}
          publish_date={selectedArticle.publish_date}
          body={selectedArticle.body}
        />
      )}
    </motion.div>
  )
}

export default ArticlePage
