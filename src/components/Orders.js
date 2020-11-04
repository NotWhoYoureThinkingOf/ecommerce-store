import React, { useState } from "react";
import "./Orders.css";
import { db } from "./firebase";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Order from "./Order";
import { motion } from "framer-motion";

function Orders() {
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
    duration: "0.1"
  }

  return (
    <motion.div 
      className="orders" 
      exit="done" 
      animate="in" 
      initial="out" 
      variants={pageChange}
      transition={pageTransition}      
    >
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </motion.div>
  );
}

export default Orders;
