import React from "react";
import Carousel from "./Carousel";
import "./CarouselHolder.css";
import { motion } from "framer-motion";

function CarouselHolder() {
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
      className="carouselHolder"
      exit="done"
      animate="in"
      initial="out"
      variants={pageChange}
      transition={pageTransition}
    >
      <h2>Featured Stuff For Gamers</h2>
      <Carousel />
    </motion.div>
  );
}

export default CarouselHolder;
