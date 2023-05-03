import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { AuthContextRecProvider } from './context/AuthContextRec'
import { AuthContextAdminProvider } from './context/AuthContextAdmin'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

<AuthContextAdminProvider>
    <AuthContextRecProvider>
    <AuthContextProvider>
  
        <App />
     
    </AuthContextProvider>
    </AuthContextRecProvider>
  </AuthContextAdminProvider>
  
  </React.StrictMode>
);
