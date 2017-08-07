import React,{Component,PropTypes} from 'react';
import './index.css';

class Tit extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="tit">
        <p className='tit-dian'> · </p>
        <p className='tit-word'>最新玩具</p>
        <div className='tit-btn'>
          <p>更多新品</p>
          <img src={require("../../img/letou.png")} alt=""/>
        </div>
      </div>

    )
  }
}
export default Tit
