import React,{Component,PropTypes} from 'react';
import './iconfont.css';
import './index.css';

class Icon extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps={
    color:'#fff'
  }
  render(){
    let type = `iconfont icon-${this.props.type}`;
    let styleData = {
      color:this.props.color,
      size:this.props.size,
      marginLeft:this.props.left,
      marginRight:this.props.rig
    }
    return(
      <i className={type} style={styleData}></i>
    )
  }
}

export default Icon
