import React,{Component,PorpTypes} from 'react';
import './index.css';
let aa = [
  {'id':'1','word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/1.jpg'},
  {'id':'2','word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/2.jpg'},
  {'id':'3','word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/3.jpg'},
  {'id':'4','word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/4.jpg'},
  {'id':'5','word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/5.jpg'}
]

class Detail extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    let imgid = this.props.params.id;
  }

  render(){
    let imgid = this.props.params.id;
    let src = '';
    for(let i = 0; i < aa.length; i++){
      if(aa[i].id ==imgid){
        src = aa[i].img
      }
    }
    return(
        <div className='detail'>
          <img src={src} alt=""/>
        </div>
    )
  }
}

export default Detail
