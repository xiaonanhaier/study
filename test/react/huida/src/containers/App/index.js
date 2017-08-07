import React,{Component,PropTypes} from'react';
import {Tabbar,Fl,Tit} from '../../components';
import './index.css';

class App extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <Fl/>
        <Tit/>
        {this.props.children}
        <Tabbar/>
      </div>
    )
  }
}
export default App;
