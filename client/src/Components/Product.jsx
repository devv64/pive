import React from 'react';
import { useParams } from 'react-router-dom';

const Product = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === Number(productId));

  return (
    <div className='flex flex-col items-center justify-center mt-40'>
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} className="w-32 h-48 object-contain mb-4 rounded-lg" />
          <p>{product.price}</p>
        </div>
      ) : (
        <h2>Product not found</h2>
      )}
    </div>
    </div>
  );
};

export default Product;
