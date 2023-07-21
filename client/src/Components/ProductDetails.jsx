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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {productSizes.map((sizeProduct) => (
        <Link key={sizeProduct.id} to={`/products/${sizeProduct.id}`}>
          <motion.button
            className={`w-full h-full p-2 rounded-lg bg-white text-black border-black ${
              location.pathname === `/products/${sizeProduct.id}`
                ? 'border-blue-600'
                : ''
            } border transition-colors duration-300 focus:outline-none overflow-hidden`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className={location.pathname === `/products/${sizeProduct.id}` ? 'text-blue-600' : ''}>
              {sizeProduct.size}
            </span>
          </motion.button>
        </Link>
      ))}
      </div>
      <p className="text-gray-600 text-lg mb-4">{price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
