import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSearchResults } from '../api/products'


function SearchResults() {
  const { search } = useParams()
  const [drinks, setDrinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  async function fetchData() {
    const data = await getSearchResults(search, currentPage)
    console.log('data: ', data)
    setDrinks(prevSearchResults => prevSearchResults.concat(data?.products))
  }

    useEffect(() => {
        fetchData()
    }, [currentPage])

  return (
    <div>
        search: {search}
        {drinks}
    </div>
  )
}

export default SearchResults