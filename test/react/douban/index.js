import React from 'react';
import ReactDom from 'react-dom';
import './src/mock';
// import {App} from './src/containers';
// const roote1 = document.getElementById('app');
// ReactDom.render(<App/>,roote1);
import { Router,hashHistory } from 'react-router'
import Routes from './src/routes';
const roote1 = document.getElementById('app');
ReactDom.render(<Router history={hashHistory} routes={Routes}/>,roote1);
