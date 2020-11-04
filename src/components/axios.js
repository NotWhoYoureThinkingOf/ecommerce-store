import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://us-central1-ecommerce-store-25bd7.cloudfunctions.net/api' // api (cloud function) url 
})

export default instance;

// https://us-central1-ecommerce-store-25bd7.cloudfunctions.net/api

// http://localhost:5001/ecommerce-store-25bd7/us-central1/api keep for debugging purposes