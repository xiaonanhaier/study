import React,{Component,PropTypes} from 'react';
import Ping from '../Ping';
import './index.css';
class Pinglist extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    let nodes = this.props.data.map((list,index)=>{
      return(
        <Ping key={list.id} data = {list}/>
      )
    })
    return(
      <div>
        {nodes}
      </div>
    )
  }
}
export default Pinglist;
