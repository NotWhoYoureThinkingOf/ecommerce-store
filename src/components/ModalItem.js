import React from "react";
import "./ModalItem.css";

function ModalItem({ id, image, title, description, price, rating }) {
  return (
    <div className="modalItem">
      <h3>{title}</h3>
    </div>
  );
}

export default ModalItem;
