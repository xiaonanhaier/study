import React,{Component,PropTypes} from 'react';
import './index.css';
import Cover from '../Cover';
import {Link} from 'react-router';
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
    let more = 'block';
    if(this.props.loading){
      more = 'none';
    }
    let nodes = this.props.data.map((list,index)=>{
      let ids = `${list.id},${list.title}`
      return(
        <Cover key={list.id} fen={list.rating.average} id={ids} imgurl = {list.images.medium} title={list.title}/>
      )
    });
    let moresytle={
      display:more,
    }
    let url = `alllist/${this.props.style}`
    return(
      <div className = 'list'>
        {loding}
        {nodes}
        <div className="more" style={moresytle}>
          <Link to={url}>{this.props.word}</Link>
        </div>
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
