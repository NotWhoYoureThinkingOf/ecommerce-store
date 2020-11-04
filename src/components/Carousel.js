import React from "react";
import "./Carousel.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import Product from "./Product";
import products from "./product-list";
import { Carousel } from "react-responsive-carousel";
import { Button } from "@material-ui/core";
import Modal from "./Modal";

export default ({
  id,
  image,
  title,
  description,
  price,
  rating,
  className,
}) => {
  const [{ basket, modal }, dispatch] = useStateValue();

  return (
    <Carousel>
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
    </Carousel>
  );
};
