import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { basketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import PaymentProduct from "./PaymentProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import { db } from "./firebase";
import {Button} from "@material-ui/core";
import { motion } from "framer-motion";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  // stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special secret which allows us to charge a customer
    // basket is a dependency because everytime the total changes we need to tell stripe that it changed so we can charge the correct amount

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects total in currency subunits (if dollars, total must be in pennies, etc.)
        url: `/payments/create?total=${basketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("SECRET >>>>", clientSecret);

  const handleSubmit = async (e) => {
    // stripe stuff
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // this is saying when paymentIntent comes back successful, do this stuff
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        // paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/placedOrder");
      });
  };

  const handleChange = (e) => {
    // listen for changes inside CardElement
    // display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

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
      className="payment" 
      exit="done" 
      animate="in" 
      initial="out" 
      variants={pageChange}
      transition={pageTransition}
    >
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p className="payment__email">{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment__section" id="payment__review">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket?.map((item, i) => (
              <PaymentProduct
                key={i}
                image={item.image}
                title={item.title}
                price={item.price}
                id={item.id}
                rating={item.rating}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe stuff */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p className="payment__total">Order Total: {value}</p>
                    </>
                  )}
                  decimalScale={2}
                  value={basketTotal(basket)}
                  fixedDecimalScale={true}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* if there's an error, show this div */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Payment;
