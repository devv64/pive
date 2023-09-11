import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory } from '../api/products';

function CategoryPage() {
  const { category } = useParams();
  const [drinks, setDrinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  async function fetchData() {
    const data = await getCategory(category, currentPage);
    setDrinks(prevDrinks => prevDrinks.concat(data.products));
  }  

  useEffect(() => {
    fetchData();
  }, [category, currentPage]);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const endIndex = currentPage * itemsPerPage;
  const visibleDrinks = drinks.slice(0, endIndex);

  console.log(drinks);

  // console.log(drinks[0]?.products)
  // visibleDrinks.map(product => product.products)
  // console.log(visibleDrinks)

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">{category} Drinks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleDrinks.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md">
            <div className="aspect-w-2 aspect-h-3">
              <img
                src={product.product.image_url}
                alt={product.name}
                className="object-cover w-full h-full rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.product.price}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleDrinks.length < drinks.length && (
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default CategoryPage;
