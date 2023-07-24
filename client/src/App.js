import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MyCarousel from './Components/MyCarousel';
import Product from './Components/Product';
import Checkout from './Components/Checkout';
import { getFeaturedProducts } from './api/products';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getFeaturedProducts()
      .then((result) => {
        setData(result);
      });
  }, []);

  const Home = () => {
    return (
      <div>
        <MyCarousel title="Featured" products={data} />
      </div>
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="mb-40"> </div>
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
