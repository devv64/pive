import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { checkoutData } = location.state;

  // Extract cart items and contact information from checkoutData
  const { cartItems, contactInfo } = checkoutData;

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Order Confirmation</h1>
      </header>
      <main>
        <p>Your order has been successfully placed.</p>

        <div>
          <h2 className="text-xl font-semibold">Order Details:</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="mb-2">
              <p>{item.price_data.product_data.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price_data.unit_amount / 100}</p>
              <hr />
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold">Contact Information:</h2>
          <p>First Name: {contactInfo.firstName}</p>
          <p>Last Name: {contactInfo.lastName}</p>
          <p>Phone Number: {contactInfo.phoneNumber}</p>
          <p>Email: {contactInfo.email}</p>
        </div>
      </main>
      <footer className="mt-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} OrderPive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrderConfirmation;
