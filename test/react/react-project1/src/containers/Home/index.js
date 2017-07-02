import React,{Component,PorpTypes} from 'react';
import Item from '../../components/Item';
let aa = [
  {'id':1,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/1.jpg'},
  {'id':2,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/2.jpg'},
  {'id':3,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/3.jpg'},
  {'id':4,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/4.jpg'},
  {'id':5,'word':'Iconfont-Iconfont-阿里巴巴矢量图标库Iconfont-阿里巴巴矢量图标库','img':'http://localhost:8080/src/img/5.jpg'}
]

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    let nodes = aa.map((aa,index)=>{
      let img = <img src = {aa.img}/>;
      return <Item id={aa.id} key={aa.id} left={aa.word} right={img}/>
    })
    return(
      <div>
          {nodes}
      </div>
    )
  }
}
export default Home
