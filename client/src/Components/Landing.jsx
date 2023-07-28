import React from 'react'
import { Link } from 'react-router-dom'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'
const { MAPS_API_KEY } = require('./config')

function Landing() {
  const libraries = ["places"]
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries
  })
  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading Maps";

  return (
    <div>
        Landing
        <Autocomplete>
          <input 
            id="autocomplete" 
            placeholder="Enter delivery address" 
            type="text"
          />
        </Autocomplete>
        <div>
            <Link to="/home">Home</Link>
        </div>
    </div>
  )
}

export default Landing