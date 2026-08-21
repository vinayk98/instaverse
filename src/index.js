import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthContext';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/notifications/styles.css';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <AuthProvider>
          <Notifications />
          <App />
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);