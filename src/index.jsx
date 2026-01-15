//React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { TrapTypeProvider } from './contexts/TrapTypeContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';

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
      <WishlistProvider>
        <div id="app">
          <PageHeader />
          <Routes>
            <Route index element={<Home />} />

            <Route path="weapons" element={
              <TrapTypeProvider value="weapons">
                <App />
              </TrapTypeProvider>
            } />

            <Route path="bases" element={
              <TrapTypeProvider value="bases">
                <App />
              </TrapTypeProvider>
            } />

            <Route path="wishlist" element={<Wishlist />} />
            <Route path="help" element={<Help />} />
          </Routes>
          <PageFooter />
        </div>
      </WishlistProvider>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
