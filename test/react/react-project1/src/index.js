import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
// import {App} from './containers';
import { Router,hashHistory } from 'react-router'
import Routes from './routes/';
const roote1 = document.getElementById('app');
ReactDom.render(<Router history={hashHistory} routes={Routes}/>,roote1);
