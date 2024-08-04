import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import StoreContextProvider from './context/authentication';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </StoreContextProvider>
);

