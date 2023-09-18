//React Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, } from 'react-router-dom';
//Component Imports
import WeaponApp from './components/weapons/WeaponApp';
import BaseApp from './components/bases/BaseApp'
import Home from './components/Home';
import PageHeader from './components/PageHeader';
import Help from './components/Help';
import Compare from './components/compare/Compare';
// CSS
import './css/styles.css';
// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


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
        <Route path="/compare" element={<Compare />} />
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
