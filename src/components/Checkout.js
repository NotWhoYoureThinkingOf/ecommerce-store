import React, { useEffect } from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { basketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

function Checkout() {
  const [{ basket }] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, []);

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
      className="checkout" 
      exit="done" 
      animate="in" 
      initial="out" 
      variants={pageChange}
      transition={pageTransition}
    >
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="ad"
        />
        <img
          className="checkout__mobileAd"
          src="https://i.pinimg.com/originals/e1/58/b1/e158b15b64c78db2e608c3d352e95b99.jpg"
          alt=""
        />
        <h2 className="checkout__header">Your Shopping Cart</h2>
        {basket.length === 0 ? (
          <h2>No items in basket</h2>
        ) : (
          <div className="checkout__items">
            {basket?.map((item, i) => {
              return (
                <CheckoutProduct
                  key={i}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  id={item.id}
                  rating={item.rating}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="checkout__right">
        <div className="checkout__totalItems">
          <p>Subtotal {`(${basket?.length} items)`}:</p>
        </div>
        {basket.length > 0 && (
          <CurrencyFormat
            renderText={(value) => (
              <>
                <div>
                  <p className="checkout__total">{value}</p>
                </div>
              </>
            )}
            decimalScale={2}
            value={basketTotal(basket)}
            fixedDecimalScale={true}
            displayType={"text"}
            thousandSeperator={true}
            prefix={"$"}
          />
        )}

        {basket?.length > 0 ? (
          <button
            className="checkout__proceed"
            onClick={(e) => history.push("/payment")}
          >
            Proceed To Checkout
          </button>
        ) : (
          <p className="checkout__proceed">Add items to proceed</p>
        )}
      </div>
    </motion.div>
  );
}

export default Checkout;
