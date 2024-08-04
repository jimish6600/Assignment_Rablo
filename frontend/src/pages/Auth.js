import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/authentication';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const {userName,currectLogin,setCurrectLogin,setUserName} = useContext(StoreContext);

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formData;

    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }


      if (isLogin) {
        const fetchResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,{
          method: "post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(formData)
        })

        const response = await fetchResponse.json()
        console.log(response);
        if(response.success){
          localStorage.setItem('authToken', response.data);
          setUserName(response.name);
          setCurrectLogin(true);
          toast.success('Login successful');
          navigate("/");
        }else{
          toast.error(response.message);
        }
        // await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { username, password });        
      } else {
        const fetchResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,{
          method: "post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(formData)
        })

        const response = await fetchResponse.json()
        console.log(response);
        if(response.success){
          toast.success('Login successful');
          setIsLogin(true); 
        }else{
          toast.error(response.message);
        }
       
      }
    
  };

  return (
    <div className='flex items-center justify-center'>
    <div className="container mx-auto p-4 w-96 mt-9">
      <h1 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-4 border border-gray-300 rounded">
        <label className="block mb-4">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        {!isLogin && (
          <label className="block mb-4">
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </label>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin((prev) => !prev)}
        className="mt-4 w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </div>
    </div>
  );
};

export default Auth;
