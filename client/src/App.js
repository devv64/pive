import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getFeaturedProducts } from './api/products';
import Navbar from './Components/Navbar';
import MyCarousel from './Components/MyCarousel';
import Product from './Components/Product';
import Checkout from './Components/Checkout';
import CartProvider from './Components/CartContext';
import Landing from './Components/Landing';
import OrderConfirmation from './Components/OrderConfirmation';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getFeaturedProducts()
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="mb-40"></div>
          <Routes>
            <Route
              path="/"
              element={<Landing />}
            />
            <Route
              path="/home"
              element={<MyCarousel title="Featured" products={data} />}
            />
            <Route
              path="/products"
              element={<MyCarousel title="Featured" products={data} />}
            />
            <Route
              path="/products/:productId"
              element={<Product />}
            />
            <Route
              path="/checkout"
              element={<Checkout />}
            />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmation />}
            />
            <Route
              path="*"
              element={<h1>404 Not Found</h1>}
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
