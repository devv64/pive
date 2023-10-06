import React from 'react';
import { GoogleMap, MarkerF, CircleF, useLoadScript } from '@react-google-maps/api';

const { MAPS_API_KEY } = require('./config');

const libraries = ['places'];

const StoreMap = ({ stores }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  const mapContainerStyle = {
    width: '100vw',
    height: '400px',
  };

  const center = { lat: 40.9263, lng: -74.0770 };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
    >
      {stores.map((store) => (
        <React.Fragment key={store.id}>
          <MarkerF position={{ lat: store.lat, lng: store.lng }} />
          <CircleF
            center={{ lat: store.lat, lng: store.lng }}
            radius={store.deliveryRadius}
            options={{
              fillColor: 'blue',
              fillOpacity: 0.3,
              strokeColor: 'blue',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </React.Fragment>
      ))}
    </GoogleMap>
  );
};

export default StoreMap;