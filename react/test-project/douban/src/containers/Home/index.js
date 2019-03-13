import React,{Component,PropTypes} from 'react';
import {Slick,List} from '../../components';
import {Icon,Header} from '../../components';
import axios from 'axios';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ban:[],
      movie:[],
      mloading:true,
      start:0,
      moviewill:[],
      willloding:true,
    }
  }
  componentWillMount(){
    axios.get('http://www.xxx.banner')
    .then((response) => {
      // console.log(response.data);
      this.setState({ban:response.data.img})

    })
    axios.get('/api/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&start=08&count=18')
    .then((movie) => {
      // console.log(movie.data.subjects);
      this.setState({movie:movie.data.subjects,mloading:false})
    })
    axios.get('/api/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b&start=08&count=18')
    .then((movie) => {
      // console.log(movie.data.subjects);
      this.setState({moviewill:movie.data.subjects,willloding:false})
    })
  }

  // listclick(){
  //   axios.get('/api/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&start='+this.state.start+'&count=6')
  //   .then((movie) => {
  //     // console.log(movie.data.subjects);
  //     this.setState({start:start+6,movie:movie.data.subjects,mloading:false})
  //   })
  // }
  render(){
    return(
      <div>
        <Slick  da={this.state.ban}/>
        <List data={this.state.movie} loading={this.state.mloading} word="更多热映" style='0'/>
        <List data={this.state.moviewill} loading={this.state.willloding} word="更多即将上映" style='1'/>
      </div>
    );
  }
}

export default Home
