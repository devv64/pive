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
    if (!acc[product.drink.name]) {
      acc[product.drink.name] = [];
    }
    acc[product.drink.name].push(product);
    return acc;
  }, {});

  const productSizes = productsByName[product.drink.name];

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h3 className="text-lg font-semibold mb-2">Category: {product.drink.category.name}</h3>
      <div className="flex flex-col md:flex-row items-center p-8 w-full max-w-6xl">
        <ProductImage src={product.image_url} alt={product.drink.name} />
        <ProductDetails name={product.drink.name} price={product.productstoreinfo_set[0].price} productSizes={productSizes} />
      </div>
    </div>
  );
};

export default Product;
