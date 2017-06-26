import React,{Component,PropTypes} from 'react';
import './index.css';
class Input1 extends Component {
  constructor(props) {
    super(props);
    this.state={value:9};
  }
  dj(){
    let text = document.getElementsByClassName('cc');
    let dx ={'id':this.state.value,'name':'潘多拉','sex':'女','zy':text[0].value}
    this.setState({value:this.state.value+1})
    this.props.click(dx);
    text[0].value="";
  }
  render(){
    return(
      <div className='aa'>
          <textarea className='cc' name="name" rows="10" cols="80"></textarea>
          <button onClick={this.dj.bind(this)}>提交</button>
      </div>
    )
  }
}

export default Input1;
