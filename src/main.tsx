import React from 'react';
import ReactDOM from 'react-dom/client';
import { SocketProvider } from './contexts/socket.tsx';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
