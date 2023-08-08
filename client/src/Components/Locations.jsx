import React from 'react'
import StoreMap from './StoreMap'
import { useCartContext } from './CartContext'

function Locations() {
  const stores = [{
    id: 1,
    lat: 40.9182,
    lng: -74.0763,
    deliveryRadius: 8046.72,
  }, {
    id: 2,
    lat: 40.94,
    lng: -74.1263,
    deliveryRadius: 8046.72,
  }]

  return (
    <div>
      <div>Locations</div>
      <StoreMap stores={stores} />
    </div>
  )
}

export default Locations