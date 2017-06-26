import React,{Component,PropTypes} from 'react';
import './index.css';
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {onoff:true};
  }
  click(){
    this.setState({onoff:!this.state.onoff});
    console.log('aaaa')
  }
  render(){
    return(
      <div>
        <button onClick={()=>{console.log(1111);}}>点击</button>
        <button onClick={()=>this.click()}>点击</button>
        <div className={this.state.onoff?'show':'no'}>
            dssdfawheo姐妹服积分自建房及饿哦房价圣诞节符
        </div>
      </div>
    )
  }
}
export default Test;
