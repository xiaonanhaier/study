import React,{Component,PropsTYpes} from 'react';
import Imglb from '../Imglb';
import './index.css';
class Lunbo extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className='lunbo'>
        <Imglb/>
      </div>
    )
  }
}

export default Lunbo;
