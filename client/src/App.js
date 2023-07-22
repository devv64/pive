import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MyCarousel from './Components/MyCarousel';
import Product from './Components/Product';
import Checkout from './Components/Checkout';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    const api = 'http://127.0.0.1:8000/products/all';

    fetch(api, {
      method: 'GET',

    })
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }


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
            element={<Product products={data} />}
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
