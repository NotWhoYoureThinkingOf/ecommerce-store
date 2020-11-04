import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import { Star } from "@material-ui/icons";
import CurrencyFormat from "react-currency-format";

function CheckoutProduct({ image, title, price, description, id, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <div className="checkoutProduct__left">
        <img src={image} alt="" />
        <div className="checkoutProduct__info">
          <h3>{title}</h3>
          <div className="checkoutProduct__rating">
            <span>Rating:</span>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <Star key={i} className="" />
              ))}
          </div>
          <button className="checkoutProduct__mobileButton" onClick={removeFromBasket}>Remove</button>
        </div>
      </div>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className="checkoutProduct__price">{value}</p>
          </>
        )}
        decimalScale={2}
        value={price}
        fixedDecimalScale={true}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button className="checkoutProduct__button" onClick={removeFromBasket}>Remove</button>
    </div>
  );
}

export default CheckoutProduct;
