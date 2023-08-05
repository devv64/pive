import React, { useEffect }from 'react';
import { useLocation } from 'react-router-dom';
import { useCartContext } from './CartContext';

const OrderConfirmation = () => {
  const { orderData } = useCartContext();

  useEffect(() => {
    console.log('orderData: ', orderData);
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Order Confirmation</h1>
      </header>
      <main>
        <p>Your order has been successfully placed.</p>
        <div>
          {orderData && orderData.order_items ? (
            <>
              <h2 className="text-xl font-semibold">Order Details:</h2>
              {orderData.order_items.map((item, index) => (
                <div key={index} className="mb-2">
                  <p>{item.product_id}</p>
                  <p>{item.store_id}</p>
                  <p>{item.quantity}</p>
                </div>
              ))}
              <h2 className="text-xl font-semibold">Contact Information:</h2>
              <p>Name: {orderData.name}</p>
              <p>Phone Number: {orderData.phone}</p>
              <p>Email: {orderData.email}</p>
            </>
          ) : null}
        </div>
      </main>
      <footer className="mt-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} OrderPive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrderConfirmation;
