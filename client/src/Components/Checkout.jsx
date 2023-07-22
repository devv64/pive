import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    // TODO: Submit the checkout form and redirect to the order confirmation page.
    navigate('/order-confirmation');
  };

  return (
    <div className="container">
      <header>
        <h1>Checkout</h1>
        <NavLink to="/">Home</NavLink>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Shipping Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your shipping address"
              value={shippingAddress.address}
              onChange={(event) => setShippingAddress({ ...shippingAddress, address: event.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <select
              className="form-control"
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
            >
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="American Express">American Express</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Checkout</button>
        </form>
      </main>
      <footer>
        Copyright © 2023 My Company
      </footer>
    </div>
  );
};

export default Checkout;
