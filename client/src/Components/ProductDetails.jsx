import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductDetails = ({ name, price, productSizes }) => {
  const location = useLocation();

  return (
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold mb-2">{name}</h2>
      <div className="flex flex-col md:flex-row mb-4">
        <label htmlFor="quantity" className="mr-2 text-sm">
          Quantity:
        </label>
        <select
          id="quantity"
          name="quantity"
          className="border rounded-lg px-4 py-2 w-24 focus:outline-none"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="grid-carousel-container flex overflow-x-auto mb-4">
        {productSizes.map((sizeProduct) => (
          <div key={sizeProduct.id} className="grid-carousel-item mr-4">
            <Link to={`/products/${sizeProduct.id}`}>
              <motion.button
                className={`w-20 h-20 m-4 rounded-lg bg-white text-black border ${
                  location.pathname === `/products/${sizeProduct.id}` ? 'border-blue-600' : 'border-black'
                } transition-colors duration-300 focus:outline-none overflow-hidden whitespace-normal`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className={location.pathname === `/products/${sizeProduct.id}` ? 'text-blue-600' : ''}>
                  {sizeProduct.size}
                </span>
              </motion.button>
            </Link>
          </div>
        ))}
      </div>
      <p className="text-gray-600 text-lg mb-4">${price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
