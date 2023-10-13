import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { getFeaturedProducts } from './api/products';
import { Navbar, MyCarousel, Product, Checkout, CartProvider, Landing, OrderConfirmation, Locations, AddressInfo, Category, SearchResult } from './Components';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getFeaturedProducts()
      .then((result) => {
        setData(result);
      });
  }, []);

  const homeElement = <MyCarousel title="Featured" products={data} />;

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="mb-40"></div>
          <MyAddressInfo />
          <Routes>
            <Route
              path="/"
              element={<Landing />}
            />
            <Route
              path="/home"
              element={homeElement}
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
              path="/locations"
              element={<Locations />}
            />
            <Route
              path="/category/:category"
              element={<Category />}
            />
            <Route
              path="/search/:search"
              element={<SearchResult />}
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

function MyAddressInfo() {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return <AddressInfo />;
}

export default App;
