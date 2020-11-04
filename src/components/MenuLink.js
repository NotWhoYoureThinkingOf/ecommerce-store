import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./MenuLink.css";

function MenuLink({ link, title }) {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      position: "relative",
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
      // position: "absolute",
    },
  };

  return (
    <motion.div className="menuLink" variants={variants}>
      <Link to={link}>
        <h2>{title}</h2>
      </Link>
    </motion.div>
  );
}

export default MenuLink;
