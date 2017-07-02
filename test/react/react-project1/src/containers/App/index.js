import React,{Component,PorpTypes} from 'react';
import {Link} from 'react-router';
import './index.css'
import Icon from '../../components/Icon';
class App extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div className='bodyy'>
        <div className="header-bg"></div>
        <div className="header">
          <Icon type='heng' rig='0.5rem'/>
          <Link to='home'>知乎日报</Link>
          <Icon type='ling' left='3.8rem'/>
          <Icon type='dian' left='0.5rem'/>
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default App
