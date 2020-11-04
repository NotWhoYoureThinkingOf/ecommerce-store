import React from "react";
import "./Modal.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { HighlightOff, Star } from "@material-ui/icons";
import CurrencyFormat from "react-currency-format";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";

function Modal({ id, image, title, description, price, rating, className }) {
  const [{ basket, modal }, dispatch] = useStateValue();

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

  const closeModal = () => {
    dispatch({
      type: actionTypes.REMOVE_MODAL,
      item: [],
    });
  };

  const backgroundVariants = {
    bgIn: {
      opacity: "100%",
      transition: {
        duration: "0.2",
      },
    },
    bgOut: {
      opacity: "0%",
      transition: {
        duration: "0.2",
      },
    },
  };

  const variants = {
    modalIn: {
      y: "0%",
      opacity: "100%",
      transition: {
        type: "linear",
      },
    },
    modalOut: {
      y: "50px",
      opacity: "0%",
      transition: {
        type: "linear",
      },
    },
  };

  return (
    <motion.div className={className}>
      <motion.div
        className="modal__background"
        onClick={closeModal}
        initial="bgOut"
        animate="bgIn"
        exit="bgIn"
        variants={backgroundVariants}
      ></motion.div>
      <motion.div
        className="modal__product"
        onClick={closeModal}
        initial="modalOut"
        animate="modalIn"
        exit="modalIn"
        variants={variants}
      >
        <img src={image} alt="" />
        <div className="modal__info">
          <h2>{title}</h2>
          <span>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <Star key={i} className="modal__star" />
              ))}
          </span>
          <p className="modal__description">{description}</p>
          <div className="modal__bottom">
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <p className="modal__price">{value}</p>
                </>
              )}
              decimalScale={2}
              value={price}
              fixedDecimalScale={true}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            <Button onClick={addToBasket}>Add To Cart</Button>
          </div>
        </div>

        <div className="modal__close" onClick={closeModal}>
          <HighlightOff />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
