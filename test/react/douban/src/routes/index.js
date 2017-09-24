import {Route,IndexRoute} from 'react-router';
import React,{Component,PropTypes} from 'react';
import {App,Home,Detail,Alllist,Video} from '../containers';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='detail/:id' component={Detail}/>
    <Route path='home' component={Home}/>
    <Route path='alllist/:type' component={Alllist}/>
    <Route path='video' component={Video}/>
  </Route>
)


// <Route path='navpage' component={NavPage}/>
