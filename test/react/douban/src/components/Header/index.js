import React,{Component,PropTypes} from 'react';
import './index.css';
import {Link} from 'react-router';
import Icon from '../Icon'
class Header extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps={
    word:'芝麻电影'
  }
  render(){
    return(
      <div className="header">
        <Icon type='category' rig='0.5rem' left='0.25rem'/>
        <div className='tit'><Link to='home'>{this.props.word}</Link></div>
        <Icon type='search'/>
        <Icon type='account' left='0.5rem'/>
        <div className="head-nav">
          <div className="nav-con">
          </div>
        </div>
      </div>
    )
  }
}
export default Header
