import React,{Component,PropsTypes} from 'react';
import './index.css';
import './animate.css';

class Imglb extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className='imglb'>
        <img className='animated bounceIn' src={require("../../img/banner.png")} alt=""/>
        <img className='animated bounceIn' src={require("../../img/banner.png")} alt=""/>
      </div>
    )
  }
}

export default Imglb
