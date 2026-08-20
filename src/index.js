import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthContext';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <MantineProvider>
      <AuthProvider>
        <Notifications position="bottom-right" />
        <App />
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);

