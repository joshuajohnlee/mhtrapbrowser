//React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { ResourceTypeProvider, WishlistProvider } from './context.jsx';

//Component Imports
import PageHeader from './components/PageHeader.jsx';
import Home from './components/Home.jsx';
import App from './components/App.jsx';
import Wishlist from './components/Wishlist.jsx';
import Help from './components/Help.jsx';
import PageFooter from './components/Footer.jsx';

// CSS Imports
import './css/styles.css';

// Font Imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Routing = () => {
  return (
    <BrowserRouter>
      <div id="app">
        <PageHeader />
        <Routes>
          <Route index element={<Home />} />
          <WishlistProvider>
          <Route path="weapons" element={<ResourceTypeProvider value="weapons"><App /></ResourceTypeProvider>} />
          <Route path="bases" element={<ResourceTypeProvider value="bases"><App /></ResourceTypeProvider>} />
          <Route path="wishlist" element={<Wishlist />} />
          </WishlistProvider>
          <Route path="help" element={<Help />} />
        </Routes>
        <PageFooter />
      </div>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
