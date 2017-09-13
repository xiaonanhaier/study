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
      mloading:true
    }
  }
  componentWillMount(){
    axios.get('http://www.xxx.banner')
    .then((response) => {
      // console.log(response.data);
      this.setState({ban:response.data.img})

    })
    axios.get('/api/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b')
    .then((movie) => {
      // console.log(movie.data.subjects);
      this.setState({movie:movie.data.subjects,mloading:false})
    })
  }
  render(){
    return(
      <div>
        <Header/>
        <Slick  da={this.state.ban}/>
        <List data={this.state.movie} loading={this.state.mloading}/>
      </div>
    );
  }
}

export default Home
