import React, { useState, useEffect } from "react";
import "./PlacedOrder.css";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function PlacedOrder() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

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
      className="placedOrder" 
      exit="done" 
      animate="in" 
      initial="out" 
      variants={pageChange}
      transition={pageTransition}
    >
      <h1>Thanks for shopping! Here's what you ordered:</h1>
      <h3>Check your email for tracking information</h3>
      <div className="placedOrder__order">
        {orders?.slice(0, 1).map((order) => (
          <Order order={order} />
        ))}
      </div>
      <div className="placedOrder__links">
        <Link to="/">Continue Shopping</Link>
        <Link to="/orders">Show Order History</Link>
      </div>
    </motion.div>
  );
}

export default PlacedOrder;
