import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    const savedOrderData = localStorage.getItem('orderData');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    }
  }, []);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    console.log('existingItem: ', existingItem);
    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, object: { ...cartItem.object, quantity: cartItem.object.quantity + item.object.quantity } }
          : cartItem
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prevItems => prevItems.map(item =>{
      if(item.id === id){
        return {...item, object: {...item.object, quantity: quantity}}
      }
      return item;
    }));
  };

  const addToOrderData = (data) => {
    console.log('data: ', data)
    setOrderData(data);
    localStorage.setItem('orderData', JSON.stringify(data));
  };

  const clearOrderData = () => {
    setOrderData({});
    localStorage.removeItem('orderData');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        orderData,
        addToOrderData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
