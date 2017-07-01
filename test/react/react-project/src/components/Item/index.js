import React,{Component,PropTypes} from 'react';
import './index.css';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="item">
        <div className="ite-left">
          {this.props.left}
        </div>
        <div className="ite-center">
          {this.props.center}
        </div>
        <div className="ite-right">
          {this.props.right}
        </div>
      </div>
    )

  }
}

export default Item;
