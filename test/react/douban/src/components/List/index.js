import React,{Component,PropTypes} from 'react';
import './index.css';
import Cover from '../Cover'
class List extends Component{
  constructor(props) {
    super(props)
  }

  render(){
    let loding = this.props.loading ?
      <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
      </div>
      :null;
    let nodes = this.props.data.map((list,index)=>{
      let ids = `${list.id},${list.title}`
      return(
        <Cover key={list.id} fen={list.rating.average} id={ids} imgurl = {list.images.medium} title={list.title}/>
      )
    });
    return(
      <div className = 'list'>
        {loding}
        {nodes}
      </div>
    )
  }
}
// <Cover id='1,a'/>
// <Cover id='2,a'/>
// <Cover id='3,a'/>
// <Cover id='4,a'/>
// <Cover id='5,a'/>
export default List
