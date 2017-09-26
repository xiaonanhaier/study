import React,{Component,PorpTypes} from 'react';
import './index.css'
import {Icon,Header} from '../../components';
class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      tit:'芝麻电影',
    }
  }
  componentWillReceiveProps(){
    let tit  ='';
    if(this.props.router.params.id){
      tit = this.props.router.params.id.split(',')[1];
    }else {
      tit ='芝麻电影'
    }
    this.setState({tit:tit})
  }
  componentWillMount(){
    // let tit  ='';
    // if(this.props.router.params.id){
    //   tit = this.props.router.params.id.split(',')[1];
    // }else {
    //   tit ='芝麻电影'
    // }
    // this.setState({tit:tit})
  }
  componentDidUpdate(){
    // let tit  ='';
    // if(this.props.router.params.id){
    //   tit = this.props.router.params.id.split(',')[1];
    // }else {
    //   tit ='芝麻电影'
    // }
    // this.setState({tit:tit})
  }
  render(){
    return(
      <div className='bodyy'>
        <Header word = {this.state.tit}/>
        {this.props.children}
      </div>
    )
  }
}
export default App
