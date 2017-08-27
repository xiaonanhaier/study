import React,{Component,PropTypes} from 'react';
import Icon from './../Icon';
import './tabbar.css';

class Tabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {childid:'aaa'};
  }
  getid(id){
    this.setState({childid:id})
  }

  //icon组件初始化
  componentDidUpdate(){
    this.refs.aaa.state={click:'none'}
    this.refs.bbb.state={click:'none'}
    this.refs.ccc.state={click:'none'}
    this.refs.ddd.state={click:'none'}
    this.refs.eee.state={click:'none'}
    // console.log('444');
    // console.log(this.refs.tab)
    // var img = this.refs.tab.children[0].children;
    // console.log(img);
    // console.log(this.refs.ccc.state);
  }
  render(){
    return(
      <div className='tabbar' ref='tab'>
        <Icon ref='aaa' id='aaa' imgurl={require("../../img/tab1.png")} click={this.getid.bind(this)} word='首页'/>
        <Icon ref='bbb' id='bbb' imgurl={require("../../img/tab4.png")} click={this.getid.bind(this)} word='玩具城'/>
        <Icon ref='ccc' id='ccc' imgurl={require("../../img/tab3.png")} click={this.getid.bind(this)} word='购物车'/>
        <Icon ref='ddd' id='ddd' imgurl={require("../../img/tab2.png")} click={this.getid.bind(this)} word='会员'/>
        <Icon ref='eee' id='eee' imgurl={require("../../img/tab5.png")} click={this.getid.bind(this)} word='我的'/>
      </div>
    )
  }
}
export default Tabbar
