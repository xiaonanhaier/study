import React,{Component,PropTypes} from 'react';
import axios from "axios";
import {Imgword} from '../../components';
import './index.css';
class Search extends Component{
  constructor(props) {
    super(props);
    this.state={
      nodes:''
    }
  }
  ser(){
    let serword = this.refs.serinp.value;
    let node =
    <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>;
    this.setState({nodes:node})
    let url=`/api/movie/search?q='${serword}'`
    axios.get(url)
    .then((movie)=>{
      node = movie.data.subjects.map((list,index)=>{
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
      this.setState({nodes:node})
    })
  }
  render(){
    return(
      <div>
        <input ref='serinp' className="serinp" type="text"/><span onClick={this.ser.bind(this)} className='serbtn'>搜索</span>
        {this.state.nodes}
      </div>
    )
  }
}
export default Search
