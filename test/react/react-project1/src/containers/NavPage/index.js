import React,{Component,PorpTypes} from 'react';
import {Link} from 'react-router';
class NavPage extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div>
        <div>navpage</div>
        <Link to='home'>详情页</Link>
      </div>
    )
  }
}
export default NavPage
