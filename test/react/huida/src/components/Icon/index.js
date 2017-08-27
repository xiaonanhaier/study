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
    let styeDate = {
        fontSize:this.props.size
    }
    let imgstyle = {
      marginTop:this.props.imgtop,
      height:this.props.imgsize,
      marginBottom:this.props.imgbot
    }
    return(
      <div className='icon' onClick={this.sta.bind(this)}>
        <img id='img' src={this.props.imgurl} style={imgstyle} alt=""/>
        <p style={styeDate}>{this.props.word}</p>
        <div ref='aaa' className='circle' style={{display:this.state.click}}></div>
      </div>
    )
  }
}

export default Icon
