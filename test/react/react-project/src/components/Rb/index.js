import React,{Component,PropTypes} from 'react';
import './index.css';
import Icon1 from './Icon1';
import Item1 from './Item1';
let aa = [
  {'id':1,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/components/rb/img/1.png'},
  {'id':2,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/components/rb/img/2.png'},
  {'id':3,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/components/rb/img/3.png'},
  {'id':4,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/components/rb/img/4.png'},
  {'id':5,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/components/rb/img/5.png'}
]
class Rb extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    let nodes = aa.map((aa,index)=>{
      let img = <img src = {aa.img}/>;
      return <Item1 key={aa.id} left={aa.word} right={img}/>
    })
    console.log(nodes);
    return(

      <div className='bodyy'>
        <div className="header">
          <Icon1 type='heng' rig='0.5rem'/>
          知乎日报
          <Icon1 type='ling' left='3.8rem'/>
          <Icon1 type='dian' left='0.5rem'/>
        </div>
        {nodes}
      </div>
    )
  }
}

export default Rb
