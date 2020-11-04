// this is a backend using node. will be using cloud functions as the backend
const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const {ResultStorage}=require('firebase-functions/lib/providers/testLab');
const stripe = require('stripe')('sk_test_51HhQR5GkZ1OiPCtR1yLsNMzKKc68XKPhp73CHcg7Li4svSjzgfdYEICr1JWSpQiD9DpqLowpwy6z679EAjQtvlPu00T2VWk89v')

// app config
const app = express();

// middleware
app.use(cors({ origin:true }))
app.use(express.json())

// api routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
  // getting the param from the url
  const total = request.query.total;

  console.log('Paymnet request received boom for this amount >>>>', total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount:total, //in subunits of the currency (pennnis in this case)
    currency:"usd"
  })
  // ok created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret
  })
})

// listen command
exports.api = functions.https.onRequest(app)

// example endpoint in terminal
// http://localhost:5001/ecommerce-store-25bd7/us-central1/api