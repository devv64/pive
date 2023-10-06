import React from 'react';

const libraries = ['places'];

const AddressInfo = () => {
  const address = localStorage.getItem('address')?.slice(1, -1);

  return (
    <div className="bg-white p-4">
      <div>
        <strong className="block text-xl mb-2">Delivery Address:</strong>
        <div className="text-lg mb-4">{address}</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Change Address
        </button>
      </div>
    </div>
  );
};

export default AddressInfo;
