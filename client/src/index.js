import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Components
import App from './global/App';

// Styles
import './index.css';
import './global/styles/bootstrap/css/bootstrap.min.css';
import './global/styles/bootstrap/js/fontawesome-all.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
