import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSearchResults } from '../api/products';

function SearchResult() {
  const { search } = useParams();
  const [drinks, setDrinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  async function fetchData() {
    const data = await getSearchResults(search, currentPage);
    console.log('data: ', data);
    setDrinks(prevSearchResults => prevSearchResults.concat(data?.products));
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {drinks.map(drink => (
          <div key={drink.product.id} className="bg-white p-4 rounded shadow-md h-[375px]">
            <img src={drink.product.image_url} alt={drink.name} className="w-full h-[250px] object-contain" />
            <p className="text-lg font-semibold">{drink.name}</p>
            <p className="text-gray-600">${drink.product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
