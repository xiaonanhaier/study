import React,{Component,PropTypes} from 'react';
import './index.css';
let styl ={
  borderRaidus:"3px",
  backgroundColor:'red'
}
class Button extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps={
    type:'default',
    value:'heheheh'
  };
  static PropTypes = {
    type:React.PropTypes.string.isRequest,
  };
  render(){
    let {type,value} = this.props  //解构赋值
    return(
      <div>
        <button className={this.props.type}>{this.props.value}</button>
      // <h1 className={this.props.type}>{this.props.value}</h1>
      // <h1 style={styl}>这是第一个react组件</h1>
      // {1+2}
      // {1+2>5?'false':'true'}
      </div>
    )
  }
}
export default Button;
