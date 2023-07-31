import React from 'react';

const CartNotification = ({ isSuccess, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-md ${
        isSuccess ? 'bg-green-400' : 'bg-red-400'
      }`}
    >
      {isSuccess ? 'Successfully added item to cart!' : 'Could not add item to cart.'}
      <button className="ml-2 text-sm font-semibold text-white" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default CartNotification;
