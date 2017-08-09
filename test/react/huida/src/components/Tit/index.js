import React,{Component,PropTypes} from 'react';
import './index.css';

class Tit extends Component {
  constructor(props) {
    super(props);
  }
 static defaultProps={
   btn:"更多新品"
 }
  render(){
    return(
      <div className="tit">
        <p className='tit-dian'> · </p>
        <p className='tit-word'>{this.props.tit}</p>
        <div className='tit-btn'>
          <p>{this.props.btn}</p>
          <img src={require("../../img/letou.png")} alt=""/>
        </div>
      </div>

    )
  }
}
export default Tit
