import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useCartContext } from './CartContext';

const { MAPS_API_KEY } = require('./config');

const libraries = ['places'];
function Landing() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries,
  });

  const { stores, addStores, clearStores, addAddress, clearAddress } = useCartContext();

  // clearAddress();

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const handleSearch = async () => {
    const addressInput = document.getElementById('autocomplete').value;
    addAddress(addressInput);

    try {
      const response = await fetch('http://127.0.0.1:8000/stores/nearby-stores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: addressInput }),
      });

      const data = await response.json();

      clearStores();
      addStores(data.all);

      if (data.all && data.all.length === 0) {
        window.location.href = '/locations';
      } else {
        window.location.href = `/home`;
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const storedAddress = localStorage.getItem('address');

  return (
    <div>
      Landing
      <Autocomplete>
        <input
          id="autocomplete"
          placeholder={storedAddress ? storedAddress.slice(1, -1) : "Enter delivery address"}
          type="text"
        />
      </Autocomplete>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Landing;
