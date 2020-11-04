import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Article from './Article'
import './News.css'
import Release from './Release'
import {useStateValue} from './StateProvider'
import { actionTypes } from './reducer'
import { motion } from "framer-motion";

function News() {
  const [articles, setArticles] = useState([])
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)
  const [{ }, dispatch] = useStateValue()
  const {articleId} = useParams()

  const BASE_URL ='http://www.gamespot.com/api/'
  const API_KEY = 'e87fa7578b21ec24297ad4276bf201c6348096f2'
  const proxy ="https://cors-anywhere.herokuapp.com/"

  // try to put these articles into the data layer right from here instead of calling the api again in the selectedArticle component
  useEffect(() => {
    fetch(`${proxy}${BASE_URL}articles/?api_key=${API_KEY}&format=json&sort=publish_date:desc`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch({
          type: actionTypes.SET_ARTICLES,
          pulled_articles: data.results
        })
        setArticles(data.results)
        setLoading(false)
        dispatch({
          type:actionTypes.SET_LOADING,
          loading: false
        })
        return data
      })
  }, [])

  useEffect(() => {
    fetch(`${proxy}${BASE_URL}releases/?api_key=${API_KEY}&format=json&sort=release_date:asc&filter=release_date:2020-11-10|2020-11-19&offset=100`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setReleases(data.results)
        return data.results
      })    
  }, [])

  
  let filtered = []

  releases.map(release => {
    if(release.region === 'North America' && release.distribution_type ==='Retail'){
      filtered.push(release)
    }
  })

  // try setting all of the filtered stuff in a function and in that function call setFiltered() at the end

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
      className="news" 
      id="news" 
      exit="done" 
      animate="in" 
      initial="out"
      variants={pageChange}
      transition={pageTransition}
    >
      <h2>Latest News</h2>
      <hr />
      <div className="news__content">
        <div className="news__articles">
          { loading ? (
            <h3>Loading...</h3>
          ) : (          
            articles.slice(0,6).map((article) => (
            <Article
              key={article.id} 
              title={article.title}
              image={article.image.square_tiny}
              info={article.deck}
              publish_date={article.publish_date}
              author={article.authors}
              body={article.body}
              originalImage={article.image.original}
              id={article.id}
              articleId={articleId}
            />
          )))}
        </div>
        <div className="news__releases">
              <h4>Upcoming Releases</h4>
            {loading ? (
                <h3>Loading...</h3>
              ) : (
              filtered.map((item, i) => (
              <Release
                key={i}
                name={item.name}
                release_date={item.release_date}
              />
            )))}
        </div>
      </div>
            
    </motion.div>
  )
}

export default News
