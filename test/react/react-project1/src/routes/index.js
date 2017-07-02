import {Route,IndexRoute} from 'react-router';
import React,{Component,PropTypes} from 'react';
import {App,Detail,Home,NavPage} from '../containers';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='detail/:id' component={Detail}/>
    <Route path='home' component={Home}/>
    <Route path='navpage' component={NavPage}/>
  </Route>
)
