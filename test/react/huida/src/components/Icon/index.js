import React,{Component,PropTypes} from 'react';
import './Icon.css'

class Icon extends Component {
  constructor(props) {
    super(props);
    this.state={click:'none'}
  }
//组件生命周期测试
// componentDidUpdate(){
//   console.log('222');
// }
// componentWillUpdate(){
//   console.log('333');
// }

//添加状态
 sta(){
  this.props.click(this.props.id);
  this.setState({click:'block'});
  //组件生命周期测试
  // console.log('111');
 }
  render(){
    return(
      <div className='icon' onClick={this.sta.bind(this)}>
        <img src={this.props.imgurl} alt=""/>
        <p>{this.props.word}</p>
        <div ref='aaa' className='circle' style={{display:this.state.click}}></div>
      </div>
    )
  }
}

export default Icon
