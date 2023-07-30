import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const isSmallScreen = window.innerWidth <= 660;
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput.trim().length > 0) {
      axios
        .get(`http://127.0.0.1:8000/drinks/search/${encodeURIComponent(searchInput)}`)
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.error('Error fetching autocomplete results:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between p-4 bg-blue-400 shadow-2xl">
      <Link to="/home" className="flex items-center w-full sm:w-auto">
        <h1 className={`text-white text-5xl ${isSmallScreen ? 'mx-auto' : 'ml-8'} py-4`}>
          Pive
        </h1>
      </Link>
      <div className="relative flex items-center w-full sm:w-auto mt-4 sm:mt-0">
        <input
          type="text"
          className="w-full sm:w-96 pl-10 pr-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Search beers, wine, liquors..."
          value={searchInput}
          onChange={handleChange}
        />
        <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 left-3" />
        <Cart />
        {suggestions?.length > 0 && (
          <ul
            className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg"
            style={{ top: '100%', minHeight: '20px' }}
          >
            {suggestions.map((item) => (
              <li key={item.id}>
                <Link to={`/products/${item.id}`} className='px-4 py-2 hover:bg-gray-100 block w-full'>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );    
};

export default Navbar;
