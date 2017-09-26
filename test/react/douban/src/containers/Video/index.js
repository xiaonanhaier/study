import React,{Component,PropTypes} from 'react';
import './index.css';
import {Icon,Header} from '../../components';
class Video extends Component {
  constructor(props) {
    super(props);
    this.state ={
      header:'花絮预告',
      loding:true,
      mp4:'',
    }
  };

  componentWillMount(){
    this.setState({
      header:this.props.location.query.name,
      mp4:this.props.location.state.data.resource_url})
  }
  render(){
    return(
      <div>
        <video src={this.state.mp4} width="100%" controls="controls">
          您的浏览器不支持 video 标签。
        </video>
      </div>
    )
  }


}
export default Video
