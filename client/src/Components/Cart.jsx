import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartContext } from './CartContext';

const Cart = () => {
  const [isCartVisible, setCartVisible] = useState(false);
  const cartRef = useRef(null); // Create a ref to the cart container

  const toggleCartVisibility = () => {
    setCartVisible(!isCartVisible);
  };

  const { cartItems } = useCartContext();

  // Add event listeners when the cart component mounts
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Close the cart if the click is outside the cart component
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartVisible(false);
      }
    };

    const handleEscKeyPress = (event) => {
      // Close the cart if the "Esc" key is pressed
      if (event.keyCode === 27) {
        setCartVisible(false);
      }
    };

    // Attach the event listeners
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscKeyPress);

    // Clean up the event listeners when the cart component unmounts
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
          {/* Cart content */}
          <h3 className="text-lg font-semibold mb-4">Your Cart</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="text-sm mb-2">
                <span>{item.name}</span>
                <span className="ml-2 text-gray-600">{item.price}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
