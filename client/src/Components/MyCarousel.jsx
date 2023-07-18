import React from 'react';
import Carousel from 'react-elastic-carousel';
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
  

  return (
    <div className="carousel-container mb-6">
      <h2 className="carousel-title text-2xl font-bold mb-4 ml-24">{title}</h2>
      <div className="carousel-wrapper flex items-center overflow-x-auto">
        <Carousel
          itemsToShow={6}
          itemsToScroll={6}
          pagination={false}
          renderArrow={renderCustomArrow}
          breakPoints={[
            { width: 0, itemsToShow: 1, itemsToScroll: 1 },
            { width: 480, itemsToShow: 2, itemsToScroll: 2 },
            { width: 768, itemsToShow: 4, itemsToScroll: 4 },
          ]}
          transitionMs={500}
        >
          {products.map((product) => (
            <div key={product.id} className="carousel-item">
              <div className="flex flex-col items-center justify-start px-4 py-6 mb-6 bg-white rounded-lg shadow-lg">
                <img src={product.image} alt={product.name} className="w-32 h-48 object-contain mb-4 rounded-lg" />
                <h3 className="text-sm font-semibold leading-tight mb-2">{product.name}</h3>
                <p className="text-sm font-medium text-gray-600">{product.price}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MyCarousel;
