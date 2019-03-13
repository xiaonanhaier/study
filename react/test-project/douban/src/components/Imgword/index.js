import React,{Component,PropTypes} from 'react';
import './index.css';
import {Link} from 'react-router';
class Imgword extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    // console.log(this.props.id)
    let url = `/detail/${this.props.id}`;
    return(
      <div className="imgword">
        <div className="imgword-img">
          <img src={this.props.imgurl} alt=""/>
        </div>
        <div className="imgword-word">
          <p>{this.props.title}</p>
          <p>{this.props.type}</p>
          <p>导演：{this.props.dy}</p>
          <p>{this.props.persons}</p>
          <p>{this.props.dates}</p>
        </div>
        <div className="imgword-btn">
            <Link to = {url}>更多</Link>
        </div>
      </div>
    )
  }
}
export default Imgword
