import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartContext } from './CartContext';

const Cart = () => {
  const [isCartVisible, setCartVisible] = useState(false);
  const cartRef = useRef(null);

  const toggleCartVisibility = () => {
    setCartVisible(!isCartVisible);
  };

  const hideCart = () => {
    setCartVisible(false);
  };

  const { cartItems, removeFromCart } = useCartContext();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartVisible(false);
      }
    };

    const handleEscKeyPress = (event) => {
      if (event.keyCode === 27) {
        setCartVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  return (
    <div className="relative ml-4" ref={cartRef}>
      <button
        className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white focus:outline-none"
        onClick={toggleCartVisibility}
      >
        <ShoppingCartIcon className="w-6 h-6" />
      </button>

      {isCartVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 mt-2 p-4 bg-white shadow-lg rounded-lg z-10"
        >
          <h3 className="text-lg font-semibold mb-4">Your Cart</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="text-sm mb-2">
                <span>{item.object.price_data.product_data.name}</span>
                <span className="ml-2 text-gray-600">${item.object.price_data.unit_amount / 100}</span>
                <span>{item.object.quantity}</span>
                <button
                  className="ml-2 text-red-600 text-sm focus:outline-none"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <Link key="checkout" to='/checkout' onClick={hideCart}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full mt-4 focus:outline-none">
              Checkout
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
