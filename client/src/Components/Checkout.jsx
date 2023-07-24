import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const CartSection = ({ cart }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold">Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="mb-2">
          <p>{item.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price}</p>
        </div>
      ))}
    </div>
  );
};

const TotalSection = ({ cart }) => {
  const calculateSubTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const deliveryFee = 5;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold">Total</h2>
      <p>Subtotal: ${calculateSubTotal()}</p>
      <p>Delivery Fee: ${deliveryFee}</p>
      <p className="text-2xl font-semibold">Total Amount: ${(calculateSubTotal() + deliveryFee).toFixed(2)}</p>
    </div>
  );
};

const ContactInfoSection = ({ contactInfo, setContactInfo }) => {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Contact Info</h2>
        <div className="mb-2">
          <label className="block">First Name:</label>
          <input
            type="text"
            className="form-input border rounded w-full"
            value={contactInfo.firstName}
            onChange={(e) => setContactInfo({ ...contactInfo, firstName: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label className="block">Last Name:</label>
          <input
            type="text"
            className="form-input border rounded w-full"
            value={contactInfo.lastName}
            onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label className="block">Phone Number:</label>
          <input
            type="text"
            className="form-input border rounded w-full"
            value={contactInfo.phoneNumber}
            onChange={(e) => setContactInfo({ ...contactInfo, phoneNumber: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label className="block">Email:</label>
          <input
            type="text"
            className="form-input border rounded w-full"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
          />
        </div>
      </div>
    );
  };  

const DeliveryInfoSection = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold">Delivery Info</h2>
    </div>
  );
};

const Checkout = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 2 },
    { id: 2, name: 'Item 2', price: 20, quantity: 1 },
  ]);

  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement Stripe Checkout integration here.
    const checkoutData = {
      cart,
      contactInfo,
    };
    console.log(checkoutData);
    navigate('/order-confirmation');
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <NavLink to="/" className="text-blue-500">Home</NavLink>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="w-full lg:w-1/2 lg:pr-8">
            <CartSection cart={cart} />
            <TotalSection cart={cart} />
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <ContactInfoSection contactInfo={contactInfo} setContactInfo={setContactInfo} />
            <DeliveryInfoSection />

            {/* Stripe Checkout Button (Replace with actual Stripe integration) */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6 w-full"
            >
              Checkout with Stripe
            </button>
          </div>
        </form>
      </main>
      <footer className="mt-4 text-center">
        <p className="text-sm">© 2023 OrderPive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Checkout;
