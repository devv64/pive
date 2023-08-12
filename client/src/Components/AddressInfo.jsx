import React from 'react';
import { useCartContext } from './CartContext';

const AddressInfo = () => {
  const {
    address,
    addAddress,
  } = useCartContext();

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
