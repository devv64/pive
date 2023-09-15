import React from 'react';
import { useCartContext } from './CartContext';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const { MAPS_API_KEY } = require('./config');

const libraries = ['places'];
const AddressInfo = () => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries,
  });

  const { addAddress } = useCartContext();

  const handleAddressChange = (event) => {
    const addressInput = document.getElementById('address').value;
    console.log('addressInput: ', addressInput)
    addAddress(addressInput);

  };

  const address = localStorage.getItem('address').slice(1, -1);

  console.log(address);

  return (
    <div>
      <div>
        <strong>Delivery Address:</strong>
        <input
          id="address"
          type="text"
          // value={address}
          // onSubmit={handleAddressChange}
          placeholder={address}
        />
        <button onClick={handleAddressChange}>Change</button>
      </div>
    </div>
  );
};

export default AddressInfo;
