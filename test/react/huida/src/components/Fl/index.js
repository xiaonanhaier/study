import React,{Component,PropTypes} from 'react';
import Icon from '../Icon';
import './index.css';

class Fl extends Component {
  constructor(props) {
    super(props)
    this.state = {childid:'aaa'};
  }
  getid(id){
    this.setState({childid:id})
  }

  render(){
    return(
      <div className="fl">
        <Icon imgurl={require("../../img/navlist1.png")} word='精选玩具' click={this.getid.bind(this)}></Icon>
        <Icon imgurl={require("../../img/navlist2.png")} word='特色活动' click={this.getid.bind(this)}></Icon>
        <Icon imgurl={require("../../img/navlist3.png")} word='积分商城' click={this.getid.bind(this)}></Icon>
        <Icon imgurl={require("../../img/navlist4.png")} word='课程购买' click={this.getid.bind(this)}></Icon>
      </div>
    )
  }
}
export default Fl
