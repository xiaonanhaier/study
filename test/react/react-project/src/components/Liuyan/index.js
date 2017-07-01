import React,{Component,PropTypes} from 'react';
import './index.css';
import List from '../List';
import Input1 from '../Input1';
import Icon from '../Icon';
import Item from '../Item';
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
    let left = <img src={require('../../img/231.jpg')}/>;
    let center = <div>电泳戴宁带你飞你</div>;
    let right = <button>提交哦</button>;
    return(
      <div>
        <Input1 click={this.huilai.bind(this)} />
        <List data={ata}/>
        <div className='icon'>
          <Icon type='video' content='aaaa' color='yellow' size = '50px' />
            <Icon type='all' content='bbbb' color='red' size = '50px' />
            <Icon type='account' content='cccc' color='orange' size = '50px' />
            <Icon type='iconfontplay2' content='dddd' color='blue' size = '50px' />
            <Icon type='gifts' content='eeee' color='black' size = '50px' />
        </div>
        <Item left={left} center={center} right={right}/>
        <Item left={right} center={center} right={left}/>
      </div>
    )
  }
}
export default Liuyan;
