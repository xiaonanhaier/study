import React,{Component,PropTypes} from 'react';
import './Icon.css'

class Icon extends Component {
  constructor(props) {
    super(props);
    this.state={click:'block'}
  }

  render(){
    return(
      <div className='icon'>
        <img src={this.props.imgurl} alt=""/>
        <p>{this.props.word}</p>
        <div className='circle' style={{display:this.state.click}}></div>
      </div>
    )
  }
}

export default Icon
