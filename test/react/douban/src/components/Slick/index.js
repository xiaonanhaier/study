import React,{Component,PropTypes} from 'react';
import Slider from 'react-slick';
import './index.css'
class Slick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      isloding:true
    }
  }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
    };
    let nodes = this.props.da.map((imgurl,index)=>{
      return (
        <div key={imgurl.id}><img src={imgurl.imgurl} alt=""/></div>
      )
    })

    // console.log(nodes);
    return (
      <Slider {...settings} className='slider'>
        {nodes}
      </Slider>
    );
  }
}
// <div><img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2408076297,711561034&fm=173&s=2F915D81124D395D94745C210300F0C0&w=640&h=332&img.JPEG" alt=""/></div>
// <div><img src="http://cms-bucket.nosdn.127.net/catchpic/6/6d/6db6367688469ea1525d1c6a70f315bb.jpg?imageView&thumbnail=550x0" alt=""/></div>
// <div><img src="http://cms-bucket.nosdn.127.net/catchpic/0/0e/0e69db7464410908e3c8bad8340ad2df.jpg?imageView&thumbnail=550x0" alt=""/></div>
export default Slick
