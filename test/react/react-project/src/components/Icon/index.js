import React,{Component,PropTypes} from 'react';
import './iconfont.css';
import './index.css';
class Icon extends Component {
  constructor(props) {
    super(props);

  }
  static defaultProps={
    color:'blue',
    fontsize:'50px',
  }
  render(){
    let type = `iconfont icon-${this.props.type}`;
    let styleData = {
      color:this.props.color,
      fontSize:this.props.size,
    }
    let sytle2={
      color:this.props.color,
    }
    return(
      <div className='icon-box'>
        <i className={type} style={styleData}></i>
        <p style={sytle2}>{this.props.content}</p>
      </div>
    )
  }
}

export default Icon;
