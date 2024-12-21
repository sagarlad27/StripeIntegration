import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/cart";
import { Navbar } from "../components/Navbar";

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleProceedToPayment = async () => {
    if (!email) {
      alert("Please enter your email address to proceed.");
      return;
    } else {
      localStorage.setItem("email", email);
    }

    const purchasedItems = cartItems.map((item) => ({
      item: item.brand,
      quantity: item.quantity,
    }));

    try {
      const response = await axios.post("http://localhost:5000/api/order/create", {
        purchasedItems,
        price: getCartTotal(),
        email,
        paymentStatus: "pending",
      });

      const clientSecret = response.data.clientSecret;
      localStorage.setItem("secret", clientSecret);
      navigate("/product/payment", { state: { clientSecret } });
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Failed to initialize payment. Please try again.");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

          <div className="mb-8">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
              ))
            ) : (
              <h2 className="text-lg text-center text-gray-500">Your cart is empty.</h2>
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Total: ${getCartTotal()}</h2>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>

              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={handleProceedToPayment}
                  className="w-full mt-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                  Proceed to Payment
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
