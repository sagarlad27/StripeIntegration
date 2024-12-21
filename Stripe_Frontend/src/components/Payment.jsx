import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { state } = useLocation();

  // Fetch clientSecret from localStorage or location state
  const [clientSecret, setClientSecret] = useState(
    state?.clientSecret || localStorage.getItem("secret") || ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe or Elements are not fully loaded.");
      return;
    }

    setIsProcessing(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError?.message) {
      setErrorMessage(submitError.message);
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/success", // Replace with your success page URL
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
      setErrorMessage(`Payment failed: ${error.message}`);
      setIsProcessing(false);
    } else {
      try {
        await axios.patch("http://localhost:3001/api/order/updateOrder", {
          email: email,
        });
      } catch (error) {
        console.error("Error updating payment status:", error);
        setErrorMessage("An error occurred while updating payment status.");
        setIsProcessing(false);
        return;
      }

      navigate("/");
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold">Loading payment details...</p>
          <div className="mt-4 loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Complete Your Payment
        </h2>
        <div className="mb-4">
          <PaymentElement />
        </div>
        <button
          type="submit"
          disabled={!stripe || !elements || !clientSecret || isProcessing}
          className={`w-full py-2 px-4 font-semibold rounded ${
            isProcessing
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 transition"
          }`}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
        {errorMessage && (
          <div className="text-red-500 text-center mt-4">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default Payment;
