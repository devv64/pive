import React from 'react'
import StoreMap from './StoreMap'
import { useCartContext } from './CartContext'

function Locations() {
  const stores = [{
    id: 1,
    lat: 40.898400,
    lng: -74.103760,
    deliveryRadius: 6000,
  }]

  return (
    <div>
      <div>Locations</div>
      <StoreMap stores={stores} />
    </div>
  )
}

export default Locations