import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './Login';
import Sea from './Sea';
import reportWebVitals from './reportWebVitals';

import { Auth0Provider, } from "@auth0/auth0-react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Montserrat', 'sans-serif']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev---o1er8b.us.auth0.com"
      clientId="PmASy7fXDZ1FhweCgq4DNiOVzPjltSyH"
      redirectUri={'https://localhost:3000/sea'}
    >
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          //<Route path='/login' element={<LoginPage/>}/>
          <Route path='/sea' element={<Sea/>}/>
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
