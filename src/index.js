//React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, } from 'react-router-dom';
//Component Imports
import WeaponApp from './components/weapons/WeaponApp';
import BaseApp from './components/bases/BaseApp'
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';
import PageHeader from './components/PageHeader';
import Help from './components/Help';
// CSS Imports
import './css/app.css';
import './css/responsive.css';
import './css/weaponapp.css';
import './css/baseapp.css';

const Routing = () => {
  return(
    <HashRouter>
      <PageHeader/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/mhtrapbrowser" element={<Home />} />
        <Route path="/weapons" element={<WeaponApp />} />
        <Route path="/bases" element={<BaseApp />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </HashRouter>
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
