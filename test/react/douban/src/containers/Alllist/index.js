import React,{Component,PropTypes} from 'react';
import './index.css';
import {Imwolist,Header} from '../../components';
import axios from 'axios';
class Alllist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie:[],
      mloading:true,
    }
  }
  componentWillMount(){
    let type = this.props.params.type;
    let url ='';

    if(type == '0'){
      url = '/api/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&start=08&count=6';
    }else{
      url = '/api/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b&start=08&count=6'
    }
    console.log(url);
    axios.get(url)
    .then((movie) => {
      // console.log(movie.data.subjects);
      this.setState({movie:movie.data.subjects,mloading:false})
    })
  }
  render(){
    return(
      <div className="alllist">
        <Header word='全部电影'/>
        <Imwolist data = {this.state.movie} loading={this.state.mloading} type ={this.props.params.type}/>
      </div>
    )
  }
}
export default Alllist;
