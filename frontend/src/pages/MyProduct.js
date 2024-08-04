import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/authentication';
import { useNavigate } from 'react-router-dom';

const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const navigate = useNavigate();
  const {currectLogin} = useContext(StoreContext);
  useEffect(() => {
    if(!currectLogin){
      navigate("/auth")
    }
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/myProducts`, 
          {
            headers: {
              "Content-Type": "application/json",
              'token': localStorage.getItem('authToken')
            }
          }
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setUpdatedProduct({ ...product });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'rating' ? parseFloat(value) : value),
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/${updatedProduct._id}`, 
        updatedProduct,
        {
          headers: {
            'token': localStorage.getItem('authToken')
          }
        }
      );
      setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
      setEditingProductId(null);
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleCancel = () => {
    setEditingProductId(null);
    setUpdatedProduct({});
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, 
        {
          headers: {
            'token': localStorage.getItem('authToken')
          }
        }
      );
      
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Rating</th>
            <th className="py-2 px-4 border-b">Featured</th>
            <th className="py-2 px-4 border-b">Company</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product._id} className='text-center'>
                <td className="py-2 px-4 border-b">
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedProduct.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    product.name || 'N/A'
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingProductId === product._id ? (
                    <input
                      type="number"
                      name="price"
                      value={updatedProduct.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    `$${Number(product.price)?.toFixed(2) || 'N/A'}`
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingProductId === product._id ? (
                    <input
                      type="number"
                      name="rating"
                      step="0.1"
                      value={parseFloat(updatedProduct.rating).toFixed(1) ||  parseFloat(product.rating)}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    `${parseFloat(product.rating?.$numberDecimal).toFixed(1)||  product.rating || 'N/A'}`
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingProductId === product._id ? (
                    <input
                      type="checkbox"
                      name="featured"
                      checked={updatedProduct.featured}
                      onChange={handleInputChange}
                      className="ml-2"
                    />
                  ) : (
                    product.featured ? 'Yes' : 'No'
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="company"
                      value={updatedProduct.company}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    product.company || 'N/A'
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingProductId === product._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="ml-4 text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 px-4 border-b text-center">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyProduct;
