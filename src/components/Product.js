import { Button } from "@material-ui/core";
import { Star } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import Modal from "./Modal";
import { actionTypes } from "./reducer";
import ProductModal from "./ProductModal";

function Product({ id, image, title, description, price, rating }) {
  const [{ basket, modal }, dispatch] = useStateValue();
  const [openProductModal, setOpenProductModal] = useState(false);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        image: image,
        title: title,
        description: description,
        price: price,
        rating: rating,
      },
    });
  };

  const openModal = () => {
    dispatch({
      type: actionTypes.SET_MODAL,
      item: {
        id: id,
        image: image,
        title: title,
        description: description,
        price: price,
        rating: rating,
      },
    });
    setOpenProductModal(true);
  };

  return (
    <div className="product" onClick={openModal}>
      <div className="product__top">
        <img src={image} alt="" />
      </div>
      <div className="product__bottom">
        <h3>{title}</h3>
        <div className="product__ratingContainer">
          <span>Rating: </span>
          <p className="product__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <Star key={i} className="product__star" />
              ))}
          </p>
        </div>
        <p className="product__description">{description}</p>
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p className="product__price">{value}</p>
            </>
          )}
          decimalScale={2}
          value={price}
          fixedDecimalScale={true}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>

      <Button onClick={addToBasket}>Add To Cart</Button>
      {/* 
        {modal.id ? (
        <ProductModal
          className="product__modal"
          title={modal.title}
          image={modal.image}
          description={modal.description}
          rating={modal.rating}
          price={modal.price}
        />
      ) : (
        <span></span>
      )}
      */}
    </div>
  );
}

export default Product;
