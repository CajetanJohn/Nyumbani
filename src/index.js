import React from 'react';
import ReactDOM from 'react-dom/client';
import {Feed, FeedLoop} from  './Components/Feed/Feed';
import Header from './Components/Header/Header';
import {Modal} from './Components/Modal/Modal';
import App from './Feed';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <App/>
  </React.StrictMode>
);
