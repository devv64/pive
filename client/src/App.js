import './App.css';
import Navbar from './Components/Navbar';
import MyCarousel from './Components/MyCarousel';

function App() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-matua-sauvignon-blanc-f32bbce18f88bcdb.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$10.99',
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-santa-margherita-pinot-grigio-fb7cd5da07a1c49d.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$12.99',
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-veuve-clicquot-brut-yellow-label-7c2c114a97da69bb.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$14.99',
    },
    {
      id: 4,
      name: 'Product 4',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-whitehaven-sauvignon-blanc-82579127df486974.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$16.99',
    },
    {
      id: 5,
      name: 'Product 5',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-barefoot-pinot-grigio-8168e7993da53196.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$18.99',
    },
    {
      id: 6,
      name: 'Product 6',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-duckhorn-decoy-cabernet-sauvignon-3b032b09f9ea1a24.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$20.99',
    },
    {
      id: 7,
      name: 'Product 7',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-matua-sauvignon-blanc-f32bbce18f88bcdb.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$10.99',
    },
    {
      id: 8,
      name: 'Product 8',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-santa-margherita-pinot-grigio-fb7cd5da07a1c49d.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$12.99',
    },
    {
      id: 9,
      name: 'Product 9',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-veuve-clicquot-brut-yellow-label-7c2c114a97da69bb.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$14.99',
    },
    {
      id: 10,
      name: 'Product 10',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-whitehaven-sauvignon-blanc-82579127df486974.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$16.99',
    },
    {
      id: 11,
      name: 'Product 11',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-barefoot-pinot-grigio-8168e7993da53196.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$18.99',
    },
    {
      id: 12,
      name: 'Product 12',
      image: 'https://dydza6t6xitx6.cloudfront.net/mi-duckhorn-decoy-cabernet-sauvignon-3b032b09f9ea1a24.jpeg?fm=jpg&auto=format%2Ccompress&ch=Width%2CDPR&h=240&q=20&dpr=2',
      price: '$20.99',
    },
  ];

  return (
    <div className="Pive">
      <Navbar />
      <div className='h-40'></div>
      <MyCarousel title="FEATURED" products={products} />
      <MyCarousel title="SUMMER SPECIALS" products={products} />
      <div className="h-[200vh]"></div>
    </div>
  );
}

export default App;
