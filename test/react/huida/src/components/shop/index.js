import React,{Component,PropsTypes} from 'react';
import './index.css';
import Icon from '../Icon';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {childid:'aaa'};
  }
  getid(id){
    this.setState({childid:id})
  }
  static defaultProps={
    imgsize:"60%",
    imgbot:"12%"
  }
  render(){
    let img = require("../../img/"+this.props.imgurl+".png");
    return(
      <div className="shop">
          <div className="shop-img">
            <Icon imgurl={img} word={this.props.word} click={this.getid.bind(this)} size='0.4rem' imgsize={this.props.imgsize} imgtop='0.6rem' imgbot={this.props.imgbot}></Icon>
          </div>
          <p style={{display:this.props.sm}}>12元/天</p>
      </div>
    )
  }
}
export default Shop;
