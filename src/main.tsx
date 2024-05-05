import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

const rootDiv = document.createElement('div');
rootDiv.id = 'root';
document.body.appendChild(rootDiv);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
