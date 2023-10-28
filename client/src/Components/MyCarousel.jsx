import React from 'react';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const MyCarousel = ({ title, products }) => {
  const renderCustomArrow = ({ type, onClick, isEdge }) => {
    const arrowClassName = `carousel-arrow ${isEdge ? 'hidden' : ''}`;
    const buttonClassName = `carousel-arrow-button ${isEdge ? 'disabled' : ''}`;
  
    return (
      <button
        className={buttonClassName}
        onClick={onClick}
      >
        <div className={arrowClassName}>
          {type === 'PREV' ? (
            <ChevronLeftIcon className="w-6 h-6" />
          ) : (
            <ChevronRightIcon className="w-6 h-6" />
          )}
        </div>
      </button>
    );
  };

  console.log('products: ', products)
  return (
    <div className="carousel-container mb-6">
      <h2 className="carousel-title text-2xl font-bold mb-2">{title}</h2>
        {/* try removing this outer div and add the classname to the carousel */}
        <Carousel
          className="carousel-wrapper flex space-x-4 items-center overflow-x-auto"
          itemsToShow={6}
          itemsToScroll={6}
          pagination={false}
          renderArrow={renderCustomArrow}

          // TODO: Shift breakpoints to be larger
          
          breakPoints={[
            { width: 0, itemsToShow: 1, itemsToScroll: 1 },
            { width: 480, itemsToShow: 2, itemsToScroll: 2 },
            { width: 768, itemsToShow: 4, itemsToScroll: 4 },
            { width: 1200, itemsToShow: 6, itemsToScroll: 6 },
          ]}
          transitionMs={1000}
          enableMouseSwipe={false}
        >
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div className="carousel-item">
                <div className="flex flex-col items-center justify-start px-4 py-6 mb-6 bg-white rounded-lg shadow-lg">
                  {/* Make this img tag a div bg-image-[] bg-contain */}
                  <img
                    src={product.image_url}
                    alt={product.drink_name}
                    className="w-32 h-48 object-contain mb-4 rounded-lg"
                  />
                  {/* Put this stuff below in a div */}
                  <div className=''  >
                    <h3 className="text-sm font-semibold leading-tight mb-2">
                      {product.drink_name}
                    </h3>
                    <h3 className="text-sm leading-tight mb-2">
                      {product.size}
                    </h3>
                    <p className="text-sm font-medium text-gray-600">
                      ${product.carrying_stores[0].price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
  );
};

export default MyCarousel;