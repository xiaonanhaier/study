import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
// import { Router,hashHistory } from 'react-router'
// import Routes from './routes/';
// import {Icon} from './components';
// import {Tabbar} from './components'
import {App} from './containers';
const roote1 = document.getElementById('app');
ReactDom.render(<App/>,roote1);
