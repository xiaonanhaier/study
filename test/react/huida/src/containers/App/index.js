import React,{Component,PropTypes} from'react';
import {Tabbar} from '../../components';

class App extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <Tabbar/>
      </div>
    )
  }
}
export default App;
