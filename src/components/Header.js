import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "./firebase";
import "./Header.css";
import logo from "./gamestore-logo.png";
import {
  Menu,
  ShoppingCartOutlined,
  SearchOutlined,
  FilterNone,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { motion, useCycle } from "framer-motion";
import MenuLink from "./MenuLink";

// install firebase in terminal

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [{ basket }] = useStateValue();
  const [placeholder, setPlaceholder] = useState(
    "What are you looking for today?"
  );

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const signOut = () => {
    dispatch({
      type: actionTypes.SET_LOGOUT,
      user: user,
    });
  };

  const menuScreen = {
    open: {
      position: "absolute",
      background: "rgba(0,0,0,.95)",
      top: 76,
      left: 0,
      right: 0,
      bottom: 0,
      height: "calc(100vh - 76px)",
      transform: "translateX(0%)",
      opacity: "100%",
      display: "flex",
      visibility: "visible",
      justifyContent: "center",
      alignItems: "center",
      transition: {
        stiffness: 1000,
        damping: 100,
      },
    },
    closed: {
      transform: "translateX(-100%)",
      opacity: "0%",
      transition: {
        stiffness: 500,
        damping: 500,
      },
    },
  };

  const menuScreenContainer = {
    open: {
      display: "flex",
      opacity: "100%",
      transition: {
        stiffness: 1000,
        damping: 100,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      opacity: "0%",
    },
  };

  const focus = () => setPlaceholder("");
  const blur = () => setPlaceholder("What are you looking for today?");

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__top">
          <motion.nav
            className="header__menu"
            onClick={() => toggleOpen()}
            initial={false}
            animate={isOpen ? "open" : "closed"}
          >
            <Menu />
            <motion.div
              className="header__menuScreen"
              id="menu"
              variants={menuScreen}
            >
              <motion.div
                className="header__menuScreenContainer"
                variants={menuScreenContainer}
              >
                <div className="header__menuLogin">
                  {!user ? (
                    <Avatar
                      onClick={signIn}
                      className="header__menuLoginIcon"
                    />
                  ) : (
                    <Avatar
                      onClick={signOut}
                      className="header__menuLoginIcon"
                      src={user.photoURL}
                    />
                  )}
                  {!user ? (
                    <button onClick={signIn}>
                      <h3>Login or Register</h3>
                    </button>
                  ) : (
                    <div className="header__menuUser">
                      <h4 className="header__menuUserName">
                        {user.displayName}
                      </h4>
                      <p onClick={signOut}>Logout?</p>
                    </div>
                  )}
                </div>
                <MenuLink title="Orders" link="/orders" />
                <MenuLink title="Cart" link="/checkout" />
              </motion.div>
            </motion.div>
          </motion.nav>

          <Link to="/" className="header__logo">
            <img src={logo} alt="" />
          </Link>

          <div className="header__links">
            <div className="header__linksContainer">
              <p>Console</p>
              <p>PC</p>
              <p>New Games</p>
              <p>Gaming News</p>
            </div>
          </div>

          <div className="header__searchbar">
            <input
              onFocus={focus}
              onBlur={blur}
              type="text"
              placeholder={placeholder}
            />
            <SearchOutlined />
          </div>

          <div className="header__right">
            <div className="header__login">
              {!user ? (
                <Avatar onClick={signIn} className="header__loginIcon" />
              ) : (
                <Avatar
                  onClick={signOut}
                  className="header__loginIcon"
                  src={user.photoURL}
                />
              )}
              {!user ? (
                <button onClick={signIn}>
                  <h3>Login or Register</h3>
                </button>
              ) : (
                <div className="header__user">
                  <h4 className="header__user">{user.displayName}</h4>
                  <p onClick={signOut}>Logout?</p>
                </div>
              )}
            </div>

            <Link to="/orders" className="header__orders">
              <p>Orders</p>
            </Link>

            <Link to="/checkout" className="header__cart">
              <ShoppingCartOutlined className="header__cartIcon" />
              <p className="header__cartInfo">
                <span>{basket.length}</span> items in cart
              </p>
              <p className="header__cartCount">
                <span>{basket.length}</span>
              </p>
            </Link>
          </div>
          <Link to="/checkout" className="header__mobileCart">
            <ShoppingCartOutlined className="header__mobileCartIcon" />
            <p className="header__mobileCartCount">
              <span>{basket.length}</span>
            </p>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
