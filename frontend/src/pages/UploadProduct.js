import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/authentication';

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    featured: false,
    rating: "",
    company: ""
  });

  const handleData = (event) => {
    const { name, value, type, checked } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'rating' ? parseFloat(value) : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (isNaN(Number(data.price)) || Number(data.price) <= 0) {
      return toast.error("Price must be a valid number greater than zero");
    }
    if (isNaN(Number(data.rating)) || Number(data.rating) < 0 || Number(data.rating) > 5) {
      return toast.error("Rating must be a number between 0 and 5");
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/addProduct`, data, {
        headers: {
          "Content-Type": "application/json",
          "token" : localStorage.getItem('authToken')
        }
      });

      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);
        setData({
          name: "",
          price: "",
          featured: false,
          rating: "",
          company: ""
        })
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };
  const navigate = useNavigate();
  const {currectLogin} = useContext(StoreContext);

  useEffect(()=>{
    if(!currectLogin){
      navigate("/auth")
    }
  },[])
  return (
    <div className="flex items-center justify-center p-4 pt-10">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-slate-100">
        <h2 className="text-2xl font-semibold mb-6">Product Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleData}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Product Name"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={handleData}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Product Price"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Featured</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={data.featured}
                onChange={handleData}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">Yes</label>
            </div>
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              step="0.1"
              id="rating"
              name="rating"
              value={data.rating}
              onChange={handleData}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Product Rating"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={data.company}
              onChange={handleData}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Company Name"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
