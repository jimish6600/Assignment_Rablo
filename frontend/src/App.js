import { createBrowserRouter,
  RouterProvider, } from 'react-router-dom'
import Home from './pages/Home';
import UploadProduct from './pages/UploadProduct';
import Auth from './pages/Auth';
import Layout from './pages/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProduct from './pages/MyProduct';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout/>
      ),
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/uploadProduct",
          element:<UploadProduct/>
        },
        {
          path:"/listProducts",
          element:<MyProduct/>
        },
        {
          path:"/auth",
          element:<Auth/>
        }
      ]
    }
  ]);
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  );
}

export default App;
