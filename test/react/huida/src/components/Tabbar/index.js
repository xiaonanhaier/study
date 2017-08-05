import React,{Component,PropTypes} from 'react';
import Icon from './../Icon';
import './tabbar.css';

class Tabbar extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className='tabbar'>
        <Icon imgurl={require("../../img/tab1.png")} word='首页'/>
        <Icon imgurl={require("../../img/tab4.png")} word='玩具城'/>
        <Icon imgurl={require("../../img/tab3.png")} word='购物车'/>
        <Icon imgurl={require("../../img/tab2.png")} word='会员'/>
        <Icon imgurl={require("../../img/tab5.png")} word='我的'/>
      </div>
    )
  }
}
export default Tabbar
