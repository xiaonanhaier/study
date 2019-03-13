import React,{Component,PropTypes} from 'react';
import './index.css';
import {Link} from 'react-router';
class Cover extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    let url = `/detail/${this.props.id}`;
    return(
      <div className="cover">
        <Link to = {url}><img src={this.props.imgurl} alt=""/></Link>
        <h3>
          <p>{this.props.title}</p>
          <span>{this.props.fen}</span>
        </h3>
      </div>
    )
  }
}
export default Cover
