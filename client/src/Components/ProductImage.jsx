import React from 'react';

const ProductImage = ({ src, alt }) => {
  return (
    <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
      <img src={src} alt={alt} className="w-full h-auto object-contain rounded-lg" />
    </div>
  );
};

export default ProductImage;
