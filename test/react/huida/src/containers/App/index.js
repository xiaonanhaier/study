import React,{Component,PropTypes} from'react';
import {Tabbar,Fl,Tit,ShopList} from '../../components';
import './index.css';

class App extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <Fl/>
        <Tit tit="最新玩具"/>
        <ShopList img1="zxwj-1" img2="zxwj-2" img3="zxwj-3" height='5rem' word1="婴儿认知套装" word2="婴儿认知套装" word3="婴儿认知套装"/>
        <Tit tit="最新图书"/>
        <ShopList img1="zxts-1" img2="zxts-2" img3="zxts-3" height="5rem" word1="婴儿认知套装" word2="婴儿认知套装" word3="婴儿认知套装"/>
        <ShopList img1="three-1" word1="赛维日夜拼图" word2="比好彩色串珠36粒" word3="比好串珠迷宫"
        img2="three-2" img3="three-3" sm="none" imgsize="50%" imgbot="6%" height="3.2rem"/>
        <Tit tit="最新图书"/>
        {this.props.children}
        <Tabbar/>
      </div>
    )
  }
}
export default App;
