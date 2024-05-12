import './index.css';

import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

const rootDiv = document.createElement('div');
rootDiv.id = 'root';
document.body.appendChild(rootDiv);

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2A254B',
      light: '#CAC6DA',
      dark: '#4E4D93',
    },
    secondary: {
      main: '#9a3270',
      light: '#ddb9d5',
      dark: '#702c5b',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
