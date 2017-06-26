import React,{Component,PropTypes} from 'react';
import './index.css';

class List extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    let ata = this.props.data
    let noodes = ata.map((aa,index)=>{
      return(
        <li key={aa.id}>
          <span>{aa.name}</span>:
          <p>{aa.sex}   {aa.zy}</p>
        </li>
      )
    })
    return(
      <ul>
        {noodes}
      </ul>
    )
  }
}
export default List;
