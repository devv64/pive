import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartContext } from './CartContext';
import CartNotification from './CartNotification';

const ProductDetails = ({ id, name, size, price, quantity, selectedSize, productSizes, onSizeChange }) => {
  const location = useLocation();
  const { addToCart } = useCartContext();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isNotificationSuccess, setIsNotificationSuccess] = useState(true);

  const handleAddToCart = () => {
    addToCart({
      id: id,
      store_id: selectedSize.carrying_stores[0].store.id,
      store_stock: selectedSize.carrying_stores[0].stock,
      object: {
        price_data: {
          currency: 'usd',
          unit_amount: Math.trunc(price * 100),
          product_data: {
            name: name + ' ' + size,
            images: [selectedSize.image_url],
          },
        },
        quantity: parseInt(document.getElementById('quantity').value),
    }});
    try {
      const isSuccess = true;

      setIsNotificationVisible(true);
      setIsNotificationSuccess(isSuccess);

      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 3000);
    } catch (error) {
      setIsNotificationVisible(true);
      setIsNotificationSuccess(false);
    }
  };

  return (
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold mb-2">{name}</h2>
      <div className="grid-carousel-container flex overflow-x-auto mb-4">
        {productSizes.map((sizeProduct) => (
          <div key={sizeProduct.id} className="grid-carousel-item mr-4">
            <motion.button
              className={`w-20 h-20 m-4 rounded-lg bg-white text-black border ${
                selectedSize.id === sizeProduct.id ? 'border-blue-600' : 'border-black'
              } transition-colors duration-300 focus:outline-none overflow-hidden whitespace-normal`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSizeChange(sizeProduct)}
            >
              <span className={selectedSize.id === sizeProduct.id ? 'text-blue-600' : ''}>
                {sizeProduct.size}
              </span>
            </motion.button>
          </div>
        ))}
      </div>
      <p className="text-gray-600 text-lg mb-4">Price: ${price}</p>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
          Quantity:
        </label>
        <div className="flex flex-col md:flex-row">
          <select
            id="quantity"
            name="quantity"
            className="border rounded-lg px-4 py-2 w-24 focus:outline-none md:mr-2"
          >
            {[...Array(quantity)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
            ))}
          </select>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full mt-4 md:mt-0 md:ml-4 focus:outline-none"
            onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        {isNotificationVisible && (
          <CartNotification isSuccess={isNotificationSuccess} onClose={() => setIsNotificationVisible(false)} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
