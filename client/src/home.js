import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Header from './global/components/Header';
import Content from './global/components/Content';
import Footer from './global/components/Footer';

// Styles
import './index.css';
import './global/styles/bootstrap/css/bootstrap.min.css';
import './global/styles/bootstrap/js/fontawesome-all.js';

ReactDOM.render(<Header />, document.getElementById('header-home'));
ReactDOM.render(<Content />, document.getElementById('content-home'));
ReactDOM.render(<Footer />, document.getElementById('footer-home'));
