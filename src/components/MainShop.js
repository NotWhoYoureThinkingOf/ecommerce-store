import React, { useEffect } from "react";
import "./MainShop.css";
import Product from "./Product";
import products from "./product-list";
import { useStateValue } from "./StateProvider";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { SpaRounded } from "@material-ui/icons";
import { useState } from "react";
import ProductModal from "./ProductModal";

function MainShop() {
  const [{ basket, modal }, dispatch] = useStateValue();
  const [modalItem, setModalItem] = useState({});

  useEffect(() => {
    console.log(modal.id);
    console.log("modalItem >>>", modalItem);
    setModalItem(modal);
  }, [modal]);

  const pageChange = {
    in: {
      x: "0%",
      opacity: "100%",
    },
    out: {
      x: "100vw",
      opacity: "0%",
    },
    done: {
      x: "-100vw",
      opacity: "0%",
    },
  };

  const pageTransition = {
    type: "spring",
    stiffness: 50,
    duration: "0.1",
  };

  return (
    <motion.div
      className="mainShop"
      id="mainShop"
      exit="done"
      animate="in"
      initial="out"
      variants={pageChange}
      transition={pageTransition}
    >
      <h2>Featured Stuff For Gamers</h2>
      <hr />
      <div className="mainShop__products">
        {products.map((_, i) => (
          <Product
            key={products[i].id}
            image={products[i].image}
            title={products[i].title}
            description={products[i].description}
            price={products[i].price}
            id={products[i].id}
            rating={products[i].rating}
          />
        ))}
      </div>
      {modal.id ? (
        <div className="mainShop__modals">
          <Modal
            className="modal"
            title={modal.title}
            image={modal.image}
            description={modal.description}
            rating={modal.rating}
            price={modal.price}
          />
          <ProductModal
            className="product__modal"
            title={modal.title}
            image={modal.image}
            description={modal.description}
            rating={modal.rating}
            price={modal.price}
          />
        </div>
      ) : (
        <span></span>
      )}
    </motion.div>
  );
}

export default MainShop;
