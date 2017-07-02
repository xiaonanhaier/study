import React,{Component,PropTypes} from 'react';
import './index.css';
import {Link} from 'react-router';
class Item extends Component {
  constructor(props){
    super(props);
  }


  render(){
    let url = `/detail/${this.props.id}`;
    // let url = 'detail';
    return(
      <div className="item">
        <div className="ite-left">
          <Link className to={url}>
            {this.props.left}
          </Link>
        </div>
        <div className="ite-right">
          {this.props.right}
        </div>
      </div>
    )
  }
}
export default Item
