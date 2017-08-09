import React,{Component,PropsTypes} from 'react';
import './index.css';
import Shop from '../shop';

class ShopList extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="ShopLlist" style={{height:this.props.height}}>
        <Shop imgurl={this.props.img1} word ={this.props.word1} sm={this.props.sm} imgsize={this.props.imgsize} imgbot={this.props.imgbot}/>
        <Shop imgurl={this.props.img2} word ={this.props.word2} sm={this.props.sm} imgsize={this.props.imgsize} imgbot={this.props.imgbot}/>
        <Shop imgurl={this.props.img3} word ={this.props.word3} sm={this.props.sm} imgsize={this.props.imgsize} imgbot={this.props.imgbot}/>
      </div>
    )
  }
}

export default ShopList
