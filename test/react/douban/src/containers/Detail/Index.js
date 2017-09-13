import React,{Component,PropTypes} from 'react';
import {Icon,Header} from '../../components';
import './index.css';
import axios from 'axios';
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      msg:{},
      xg:'',
      fen:0,
      type:'',
      time:'',
      bgimg:'https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2493261459.jpg',
      coimg:'',
      date:'',
    }
  }

  componentDidMount(){
    let id = this.props.params.id;
    let name = id.split(',')[1];
    this.setState({name:name})
    let url = `/api/movie/subject/${id.split(',')[0]}?apikey=0b2bdeda43b5688921839c8ecb20399b`
    axios.get(url)
    .then((movie) => {
      // console.log(movie.data.subjects);
      console.log(movie.data);
      this.setState({
        xg:movie.data.aka[0],
        fen:movie.data.rating.average,
        type:movie.data.genres.join('/'),
        time:movie.data.durations,
        bgimg:movie.data.images.large,
        coimg:movie.data.images.small,
        date:movie.data.pubdates[0]
      })

    })
  }
  render(){
    let bgimg = {
      backgroundImage:'url('+this.state.bgimg+')',
    }
    // console.log(bgimg)
    return(
      <div>
          <Header word={this.state.name}/>
          <div className='detail' style={bgimg} >
           <div className='detail-con'>
             <div className='detail-img'>
               <img src={this.state.coimg} alt=""/>
             </div>
             <div className='detail-word'>
               <p>{this.state.name}</p>
               <p>{this.state.xg}</p>
               <p>{this.state.fen}</p>
               <p>{this.state.type}</p>
               <p>{this.state.time}</p>
               <p>{this.state.date}</p>
             </div>
           </div>
          </div>
      </div>
    )
  }
}
export default Detail
