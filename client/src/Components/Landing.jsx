import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
const { MAPS_API_KEY } = require('./config');

function Landing() {
  const libraries = ['places'];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries,
  });


  const [stores, setStores] = useState([]);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const handleSearch = async () => {
    const addressInput = document.getElementById('autocomplete').value;
    console.log('addressInput: ', addressInput)
  
    try {
      const response = await fetch('http://127.0.0.1:8000/stores/nearby-stores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: addressInput }),
      });
  
      const data = await response.json();
      console.log('data: ', data);
      setStores(data);
  
      if (data.all && data.all.length === 0) {
        window.location.href = '/locations';
      } else {
        const encodedStores = encodeURIComponent(JSON.stringify(stores));
        window.location.href = `/home?stores=${encodedStores}`;
      }
      
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  return (
    <div>
      Landing
      <Autocomplete>
        <input id="autocomplete" placeholder="Enter delivery address" type="text" />
      </Autocomplete>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Landing;
