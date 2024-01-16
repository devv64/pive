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

  const { cartItems, removeFromCart, updateQuantity } = useCartContext();

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

  const isCheckoutEnabled = () => {
    return cartItems.length > 0;
  }

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
          className="absolute right-0 min-w-[200px] mt-2 p-4 bg-white shadow-lg rounded-lg z-10"
        >
          <h3 className="text-lg font-semibold mb-4">Your Cart</h3>
          <ul className="list-none p-0 m-0">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center w-[300px] justify-between border-b border-gray-300 py-2">
                <select
                  id={`quantity-${item.id}`}
                  className="border rounded-lg px-2 py-1 text-sm focus:outline-none"
                  defaultValue={item.object.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                >
                  {Array.from({ length: item.store_stock }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span className="text-sm font-bold">{item.object.price_data.product_data.name}</span>
                <span className="text-sm text-gray-600">${item.object.price_data.unit_amount / 100}</span>
                <button
                  className="text-sm text-red-600 focus:outline-none"
                  onClick={() => removeFromCart(item.id)}
                >
                  <span className="text-lg font-bold">×</span>
                </button>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-0" />
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">
              ${cartItems.reduce((total, item) => total + item.object.price_data.unit_amount / 100 * item.object.quantity, 0).toFixed(2)}
            </span>
          </div>
          { isCheckoutEnabled() && (
          <Link key="checkout" to='/checkout' onClick={hideCart}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full mt-4 focus:outline-none">
              Checkout
            </button>
          </Link>
            )}
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
