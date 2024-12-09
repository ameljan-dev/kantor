import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './layouts/Header';
import Page from './layouts/Page';
import Footer from './layouts/Footer';
import './stylesheet/style.css';

const root = ReactDOM.createRoot(
  document.getElementById('content') as HTMLElement
);
root.render(
  <>
    <Header />
    <Page />
    <Footer />
  </>
);
