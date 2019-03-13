import React,{Component,PropTypes} from 'react';
import './index.css';
import Imgword from '../Imgword';
import {Link} from 'react-router';
import axios from 'axios';
class Imwolist extends Component{
  constructor(props) {
    super(props)
    this.state = {
      node:[],
      start:6,
    }
  }
  mores(){
    let type = this.props.type;
    // console.log(type)
    let url ='';
    // console.log(type);
    if(type == '0'){
      url = `/api/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${this.state.start}&count=6`;
    }else{
      url = `/api/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${this.state.start}&count=6`
    }
    // console.log(url)
    axios.get(url)
    .then((movie) => {
      console.log(movie.data.subjects);
      let node = movie.data.subjects.map((list,index)=>{
        let name = '';
        if(list.directors.length>0){
          name =list.directors[0].name
        }else {
          name ='暂无';
        }

        let ids = `${list.id},${list.title}`;
        let types = list.genres.join(' / ') ;
        let persons = list.casts.map((re,index)=>{
          return re.name;
        })
        let person = persons.join(' / ')
        // console.log(person);
        return(
          <Imgword key={list.id} type={types} dates = {list.year} dy= {name}
           id={ids} imgurl = {list.images.medium} title={list.title} persons={person}/>
        )
      });
      // console.log(this.props.data)

      let nodes = this.state.node.concat(node);
      // console.log(nodes)
      this.setState({start:this.state.start+6,node:nodes})
    })
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
        let name = '';
        if(list.directors.length>0){
          name =list.directors[0].name
        }else {
          name ='暂无';
        }
      let ids = `${list.id},${list.title}`;
      let types = list.genres.join(' / ') ;
      let persons = list.casts.map((re,index)=>{
        return re.name;
      })
      let person = persons.join(' / ')
      // console.log(person);
      return(
        <Imgword key={list.id} type={types} dates = {list.pubdates[0]} dy= {name}
         id={ids} imgurl = {list.images.medium} title={list.title} persons={person}/>
      )
    });

    let moresytle={
      display:more,
    }
    return(
      <div ref = 'con' className = 'list'>
        {loding}
        {nodes}
        {this.state.node}
        <div ref='btn' className="more" style={moresytle}>
          <p onClick={this.mores.bind(this)}>查看更多</p>
        </div>
      </div>
    )
  }
}
export default Imwolist
