import React, { useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";

export const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  let items = 0;
  for (let i = 0; i < cartItems?.length; i++) {
    items += cartItems[i].quantity;
  }

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="p-4 border-b shadow-lg bg-blue-600">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <p
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          ShopEase
        </p>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <p
            className="text-white font-medium cursor-pointer hover:text-blue-200"
            onClick={() => handleNavigation("/checkout")}
          >
            Shop
          </p>
        </div>

        {/* Cart */}
        <div
          className="relative flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation("/checkout")}
        >
          <CiShoppingCart size={30} className="text-white" />
          <p className="text-xl text-white">{items}</p>
        </div>
      </nav>
    </header>
  );
};
