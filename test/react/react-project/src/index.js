import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import './mock/'
//import Test from './components/Test/'
// import Input1 from './components/Input1/'
// import Liuyan from './components/Liuyan/'
// import Rb from './components/rb';
import Button from './components/button/'
//import List from './components/List/'
// import Button from './components/Button/'
const roote1 = document.getElementById('app');
// const roote2 = document.getElementById('app1');
// const roote3 = document.getElementById('app2');
//接收两个参数  一个是组件  2是 要挂在的节点
// ReactDom.render(<Test/>,roote1);


//留言板
// ReactDom.render(<Liuyan/>,roote1);

// ReactDom.render(<Rb/>,roote1);
ReactDom.render(<Button/>,roote1);
// ReactDom.render(<List/>,roote3);
