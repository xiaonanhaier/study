import React,{Component,PropTypes} from 'react';
import './index.css';
import axios from 'axios';
// import mock from 'mockjs';
let styl ={
  borderRaidus:"3px",
  backgroundColor:'red'
}

// let aa = mock.mock({
//   'list|1-10':[{
//     'id|+1':1
//   }]
// })
// console.log(aa);
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      isloding:true
    }
  }
  static defaultProps={
    type:'default',
    value:'heheheh'
  };
  static PropTypes = {
    type:React.PropTypes.string.isRequest,
  };
  componentDidMount(){
    axios.get('/api/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b')
    .then((response) => {
      console.log(response.data.subjects);
      this.setState({data:response.data.subjects,isloding:false})
    })
    axios.get('aa.json')
    .then((response) => {
      console.log(response.data);
    })
  }
  render(){
    let {type,value} = this.props ; //解构赋值
    console.log(this.state.data);
    let data = this.state.data;
    let listnode = data.map((da,index)=>{
      return(
        <div key={da.id}>
          {da.title}
        </div>
      )
    })
    let loding = this.state.isloding ?
      <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
      </div>
      :null;
    return(
      <div>
        <button className={this.props.type}>{this.props.value}</button>
        <h1 className={this.props.type}>{this.props.value}</h1>
        <h1 style={styl}>这是第一个react组件</h1>
        {1+2}
        {1+2>5?'false':'true'}
        {loding}
        {listnode}
      </div>
    )
  }
}
export default Button;
