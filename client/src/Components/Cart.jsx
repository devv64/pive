import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartContext } from './CartContext';


const Cart = () => {
    const [isCartVisible, setCartVisible] = useState(false);
  
    const toggleCartVisibility = () => {
      setCartVisible(!isCartVisible);
    };
  
    const { cartItems } = useCartContext();

    return (
      <div className="relative ml-4">
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
  