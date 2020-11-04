import React from "react";
import "./PaymentProduct.css";
import { useStateValue } from "./StateProvider";
import { Star } from "@material-ui/icons";
import CurrencyFormat from "react-currency-format";

function PaymentProduct({ image, title, price, description, id, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="paymentProduct">
      <img className="paymentProduct__image" src={image} alt="" />

      <div className="paymentProduct__info">
        <p className="paymentProduct__title">{title}</p>
        <p className="paymentProduct__description">{description}</p>
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p className="paymentProduct__price">{value}</p>
            </>
          )}
          decimalScale={2}
          value={price}
          fixedDecimalScale={true}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
        <div className="paymentProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <Star key={i} className="" />
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from cart</button>
        )}
      </div>
    </div>
  );
}

export default PaymentProduct;
