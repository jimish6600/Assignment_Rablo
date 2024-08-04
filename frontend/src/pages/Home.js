import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import DisplayProduct from '../components/DisplayProduct.js'

const Home = () => {
  const [filterData,setFilterData] = useState([]);
  const handleApplyFilters = (data) => {
    setFilterData(data);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`,{method: "get"})
    
        const responseData = await fetchResponse.json()
        console.log(responseData.data)
        setFilterData(responseData.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex">
      <div className="w-1/4 p-4 bg-gray-200">
        <Filter handleApplyFilters={handleApplyFilters} />
      </div>
      <div className="w-3/4 p-4">
        <DisplayProduct data={filterData}/>
      </div>
    </div>
  )
}

export default Home