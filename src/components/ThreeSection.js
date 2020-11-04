import React from "react";
import "./ThreeSection.css";

function ThreeSection({ image, info, bg }) {

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
    duration:"0.5"
  }

  return (
    <motion.div 
      className="threeSection" 
      exit="done" 
      animate="in" 
      initial="out"
      variants={pageChange}
      transition={pageTransition}
    >
      <div className="threeSection__bg" style={{ background: `${bg}` }}></div>
      <img src={image} alt="" />
      <div className="threeSection__info">
        <p>{info}</p>
        <a href="#">SHOP NOW</a>
      </div>
    </motion.div>
  );
}

export default ThreeSection;
