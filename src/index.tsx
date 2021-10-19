import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App/App';
import { Provider } from 'react-redux';
import { store } from './Store/Store';
import {HashRouter } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
    document.getElementById('root'));
serviceWorker.unregister();
