import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./components/Payment";
import CheckoutPage from "./pages/CheckoutPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Success from "./components/Success";

const stripePromise = loadStripe("pk_test_51QXdi6CNe28bMH335TjKWUXZr8qzAwsFDxAJjBBlGl4aPpO1Rx7wK3ztcFbR3bpQpPPLkN27iMKuduc9KqbpTitG002hKqA8Jr");

function App() {
  const secret=localStorage.getItem("secret")
  const [clientSecret, setClientSecret] = useState(secret);

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/product/payment"
          element={
            
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <Payment />
              </Elements>
            
          }
          
        />
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </Router>
  );
}

export default App;


