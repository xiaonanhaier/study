import React,{Component,PorpTypes} from 'react';
import './index.css'
import {Icon,Header} from '../../components';
class App extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount(){
    console.log(this.props.children)
  }
  render(){
    return(
      <div className='bodyy'>
        {this.props.children}
      </div>
    )
  }
}
export default App
