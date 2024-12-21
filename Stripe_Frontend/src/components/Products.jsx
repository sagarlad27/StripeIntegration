import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  async function getProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setProducts(data.products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Shop the Latest Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {product.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {product.description.slice(0, 60)}...
                </p>
                <p className="mt-2 text-lg font-semibold text-blue-600">
                  ${product.price}
                </p>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm 
                  font-semibold rounded hover:bg-blue-700 transition duration-300"
                >
                  Add to Cart
                </button>
                <button
                  className="text-sm text-blue-600 font-semibold hover:underline"
                  onClick={() => alert("Feature coming soon!")}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
