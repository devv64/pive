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

  const { address,addAddress } = useCartContext();

  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    addAddress(newAddress);
  };

  return (
    <div>
      <div>
        <strong>Delivery Address:</strong>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder={address}
        />
      </div>
    </div>
  );
};

export default AddressInfo;
