import React,{Component,PropTypes} from 'react';
import './index.css';
import List from '../List';
import Input1 from '../Input1';
let ata = [
  {'id':'1','name':'潘多拉','sex':'女','zy':'城管'},
  {'id':'2','name':'猎狐者','sex':'女','zy':'小贩'},
  {'id':'3','name':'飞虎队','sex':'男','zy':'总统'}
]

class Liuyan extends Component {
  constructor(props) {
    super(props);
    this.state={value:''}
  }
  huilai(zhi){
    this.setState({value:zhi})
    ata.push(zhi);
  }
  render(){
    return(
      <div>
        <Input1 click={this.huilai.bind(this)} />
        <List data={ata}/>
      </div>
    )
  }
}
export default Liuyan;
