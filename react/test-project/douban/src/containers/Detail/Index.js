import React,{Component,PropTypes} from 'react';
import {Icon,Header,Pinglist} from '../../components';
import './index.css';
import axios from 'axios';
import {Link} from 'react-router';
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      loding:'block',
      msg:{},
      xg:'',
      fen:0,
      type:'',
      time:'',
      bgimg:'https://img1.doubanio.com/view/movie_poster_cover/ipst/public/p2493261459.jpg',
      coimg:'',
      date:'',
      yy:[],
      hx:[],
      jq:'',
      zk:true,
      jqh:'1.6rem',
      jqimg:'down.png',
      pl:[],
    }
  }

  componentDidMount(){
    let id = this.props.params.id;
    let name = id.split(',')[1];
    this.setState({name:name})
    let url = `/api/movie/subject/${id.split(',')[0]}?apikey=0b2bdeda43b5688921839c8ecb20399b`
    axios.get(url)
    .then((movie) => {
      this.setState({
        xg:movie.data.aka[0],
        fen:movie.data.rating.average,
        type:movie.data.genres.join('/'),
        time:movie.data.durations,
        bgimg:movie.data.images.large,
        coimg:movie.data.images.small,
        date:movie.data.pubdates[0],
        yy:movie.data.casts,
        jq:movie.data.summary,
        hx:movie.data.trailers,
        loding:'none',
      })
    })
    let plurl = `/api/movie/subject/${id.split(',')[0]}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=5`
    axios.get(plurl)
    .then((pl) => {
      // console.log(pl.data.reviews);
      this.setState({pl:pl.data.reviews})
    })
  }

  zk(){
    if(this.state.zk){
      this.setState({jqh:'auto',jqimg:'up.png',zk:!this.state.zk})
    }else{
      this.setState({jqh:'1.25rem',jqimg:'down.png',zk:!this.state.zk})
    }
  }
  render(){
    //banner背景图片
    let bgimg = {
      backgroundImage:'url('+this.state.bgimg+')',
    }

    //loading
    let yczz ={
      display:this.state.loding,
    }

    //演员数组
    let yyname = this.state.yy.map((list,index)=>{
      return list.name
    })
    let yynames = yyname.join(' / ');

    //演员宽宽度
    let leng = this.state.yy.length*1.6;
    let imperstyle ={
      width:leng+'rem'
    }

    //演员图片list
    let yyimgs = this.state.yy.map((list,index)=>{
      return (
        <div key={list.id} className="imgper">
          <img src={list.avatars.medium} alt=""/>
          <p>{list.name}</p>
        </div>
      )
    })

    let hxleng = this.state.yy.length*2.2;
    let hxstyle ={
      width:hxleng+'rem',
      height:'2rem'
    }

    //花絮列表
    let huaxu = this.state.hx.map((list,index)=>{
      return (
        <div key={list.id} className="imgper hx">
          <Link to={{pathname:"/video/0,"+list.title, query:{movie: this.props.params.id,name:list.title, hxid:index},state:{data:list}}}><img src={list.medium} alt=""/></Link>
          <p>{list.title}</p>
        </div>
      )
    })

    let jqh = {
      height:this.state.jqh
    }
    // console.log(yynames);
    // console.log(bgimg)
    return(
      <div>
          <div className="zhezhao"  style = {yczz}>
              <div className="loading">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
              </div>
          </div>
          <div className='detail' style={bgimg} >
           <div className='detail-con'>
             <div className='detail-img'>
               <img src={this.state.coimg} alt=""/>
             </div>
             <div className='detail-word'>
               <p>{this.state.name}</p>
               <p>{this.state.xg}</p>
               <p>{this.state.fen}</p>
               <p>{this.state.type}</p>
               <p>{this.state.time}</p>
               <p>{this.state.date}</p>
             </div>
           </div>
           <div className="yy">
              演员：{yynames}
           </div>
           <div className="kuai">
              <div className="kuai-tit">
                剧情介绍
              </div>
              <div className="kuai-con jq-height" >
                <div ref='jq' className="jq-con" style={jqh}>
                  {this.state.jq}
                </div>
                <p onClick={this.zk.bind(this)}><img src={require("./../../assets/images/"+this.state.jqimg)} alt=""/></p>
              </div>
           </div>
           <div className="kuai">
              <div className="kuai-tit">
                演职人员
              </div>
              <div className="kuai-con imgpers">
                <div className="imgper-con" style={imperstyle}>
                  {yyimgs}
                </div>
              </div>
           </div>
           <div className="kuai">
              <div className="kuai-tit">
                预告花絮
              </div>
              <div className="kuai-con imgpers">
                  <div className="imgper-con" style={hxstyle}>
                    {huaxu}
                  </div>
              </div>
           </div>
           <div className="kuai">
              <div className="kuai-tit">
                短评
              </div>
           </div>
           <Pinglist data={this.state.pl}/>
           <div className="pl">
                <p>查看豆瓣评论</p>
           </div>
          </div>
      </div>
    )
  }
}
export default Detail
