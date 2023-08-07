import React, { useState, useEffect }from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useCartContext } from './CartContext';

const OrderConfirmation = () => {
  // const { orderData } = useCartContext();
  const order_id = new URLSearchParams(useLocation().search).get('order_id');
  console.log('order_id: ', order_id)
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const data = await get_order(order_id);
      setOrderData(data);
    };
    fetchOrderData();
  }, []);

  const get_order = async (order_id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/order/get_order/${order_id}`)
      const data = await response.json();
      console.log('data: ', data);
      return data;
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }

  console.log(orderData)
  
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
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{item.size}</p>
                  <p>{item.image}</p>
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
