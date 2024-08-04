import React, { useState } from 'react';

const Filter = ({ handleApplyFilters }) => {
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);


  const getPircefilter = async() =>{
    const fetchResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/price/${price}`,{method: "get"})
    
    const responseData = await fetchResponse.json()
    console.log(responseData.data)
    handleApplyFilters(responseData.data);
  }

  const getRatingfilter = async() => {
    const fetchResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/rating/${rating}`,{method: "get"})
    
    const responseData = await fetchResponse.json()
    console.log(responseData.data)
    handleApplyFilters(responseData.data);
  }

  const getFeaturedfilter = async() => {
    const fetchResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/featured`,{method: "get"})
    
    const responseData = await fetchResponse.json()
    console.log(responseData.data)
    handleApplyFilters(responseData.data);
  }


  return (
    <div className="p-4 bg-gray-100 h-full">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price Under:</label>
            <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full pl-3 pr-1 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Min Price"
            />
        </div>
        <button
            className="mt-0 mb-5  w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={()=>getPircefilter()}
        >
            Apply Filters
        </button>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Minimum Rating:</label>
            <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full pl-3 pr-1 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Rating"
            />
        </div>
        <button
            className="mt-0 mb-5 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={()=>getRatingfilter()}
        >
            Apply Filters
        </button>

        <button
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={()=>getFeaturedfilter()}
        >
            Featured Product
        </button>
    </div>
  );
};

export default Filter;
