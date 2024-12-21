import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  // Redirect to the home page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer); // Cleanup the timeout
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl text-center max-w-lg w-full">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase! Your order is being processed and will be shipped shortly.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Shop More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
