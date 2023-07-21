import React from 'react';
import { useParams } from 'react-router-dom';
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';

const Product = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === Number(productId));

  if (!product) {
    return <h2 className="text-2xl font-bold mt-40">Product not found</h2>;
  }

  const productsByName = products.reduce((acc, product) => {
    if (!acc[product.name]) {
      acc[product.name] = [];
    }
    acc[product.name].push(product);
    return acc;
  }, {});

  const productSizes = productsByName[product.name];
  
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="flex flex-col md:flex-row items-center p-8 w-full max-w-md">
        <ProductImage src={product.image} alt={product.name} />
        <ProductDetails name={product.name} price={product.price} productSizes={productSizes} />
      </div>
    </div>
  );
};

export default Product;
