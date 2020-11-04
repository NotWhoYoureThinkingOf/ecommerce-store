import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion} from 'framer-motion'
import "./App.css";
import ArticlePage from "./components/ArticlePage";
import Body from "./components/Body";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainShop from "./components/MainShop";
import Carousel from "./components/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import News from "./components/News";
import Payment from "./components/Payment";
import ThreeSections from "./components/ThreeSections";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";
import PlacedOrder from "./components/PlacedOrder";
import CarouselHolder from "./components/CarouselHolder";

const promise = loadStripe(
  "pk_test_51HhQR5GkZ1OiPCtRhSdGAognW80V4Nx05pERPZBXRpn2rjdVIUIpDlaVO3yocAF5aXjEojPwXIJunnPknyKUiwaA00RMmozJ1H"
);

function App() {
  const location = useLocation();
  return (
    <motion.div className="app">
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/placedOrder">
              <PlacedOrder />
            </Route>

            <Route path="/orders">
              <Orders />
            </Route>

            <Route path="/checkout">
              <Checkout />
            </Route>

            <Route path="/payment">
              {/* this is called a higher order function */}
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>

            <Route path="/articles/:articleId">
              <ArticlePage />
            </Route>

            <Route path="/">
              <Body />
              <MainShop />
              <CarouselHolder />
              <ThreeSections />
              <News />
            </Route>
          </Switch>
        </AnimatePresence>        
        <Footer />
    </motion.div>
  );
}

export default App;
