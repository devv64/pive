import React from 'react';
import { useParams, Link } from 'react-router-dom';

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
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-48 object-contain mb-4 rounded-lg"
        />
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 text-lg mb-4">{product.price}</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none">
          Add to Cart
        </button>
      </div>

      {/* Display other sizes as links to product pages */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Available Sizes:</h3>
        <ul className="space-y-2">
          {productSizes.map((product) => (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="text-blue-600 hover:underline"
              >
                {product.size}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
