import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import configureStore from './store/configureStore';
import Routes from './routes';
import {history} from './constants';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import {ConnectedRouter} from 'react-router-redux';
import 'babel-polyfill';
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
