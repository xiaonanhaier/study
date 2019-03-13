import React,{Component,PropTypes} from 'react';
import './index.css';
import axios from 'axios';
class Ping extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){

    // axios.get('/api/movie/subject/26865690/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20')
    // .then((pl) => {
    //   console.log(pl);
    // })
  }
  render(){
    // console.log(this.props.data)
    return(
      <div className='ping'>
        <div className="user">
          <img src={this.props.data.author.avatar} alt=""/>
          <div className="user-msg">
            <p>{this.props.data.author.name}</p>
            <p>{this.props.data.updated_at}</p>
          </div>
          <div className='user-fen'>{this.props.data.rating.value}分</div>
        </div>
        <div className="ping-con">
          {this.props.data.summary}
        </div>
      </div>
    )
  }
}
export default Ping
