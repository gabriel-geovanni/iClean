import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProvider from './context';
import Routes from './routes/index.routes';
import GlobalStyles from './styles/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <Routes />
      <GlobalStyles/>
    </AppProvider>
  </React.StrictMode>
);
