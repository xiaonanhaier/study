import React,{Component,PropTypes} from 'react';
import './index.css';
import {Link} from 'react-router';
import Icon from '../Icon'
class Header extends Component {
  constructor(props) {
    super(props);
    this.state ={
      tc:true,
      tcvalue:'-100%',
      headh:'0.9rem',
    }
  }
  static defaultProps={
    word:'芝麻电影'
  }
  tc(){
    if(this.state.tc){
        this.setState({
          tcvalue:'0',
          headh:'100%',
          tc:false
        })
    }else {
      this.setState({
        tcvalue:'-100%',
        tc:true,
      })
      setTimeout(
        () => { this.setState({
                  headh:'0.9rem',
                })
        },800
      );
    }
  }
  render(){
    let tcstyle ={
      left:this.state.tcvalue
    }
    let hestyle ={
      height:this.state.headh
    }
    return(
      <div className="header" style ={hestyle}>
        <div className="head-con">
          <Icon onClick={this.tc.bind(this)} type='category' rig='0.5rem' left='0.25rem'/>
          <div className='tit'><Link to='home'>{this.props.word}</Link></div>
          <Link to='Search'><Icon type='search'/></Link>
          <Icon type='account' left='0.5rem'/>
        </div>

        <div className="nav" style={tcstyle}>
          <div className="nav-list">
            <Link onClick={this.tc.bind(this)} to='home'><p>首页</p></Link>
            <Link onClick={this.tc.bind(this)} to='Search'><p>搜索</p></Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Header
