//React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Component Imports
import WeaponApp from './components/WeaponApp';
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';
import PageHeader from './components/PageHeader';
import Help from './components/Help';
// CSS Imports
import './css/app.css';
import './css/responsive.css';
import './css/weaponapp.css';

const Routing = () => {
  return(
    <BrowserRouter>
      <PageHeader/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="mhtrapbrowser" element={<Home />} />
        <Route path="weapons" element={<WeaponApp />} />
        <Route path="help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Routing />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
