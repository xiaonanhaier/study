import React,{Component} from 'react';
import "./shouye.css";
import { Carousel } from 'antd';
import b123 from '../../common/images/123.jpg';
import b456 from '../../common/images/456.jpg';
import b789 from '../../common/images/789.jpg';
// import {Editor} from "../../components/index";
import {ArticleLable} from "../../components/index";
import { axiosapi as api} from "../../api/index";
class Shouye extends Component{
    constructor(props){
        super(props);
        this.state = {
            article:[],
        }
    }
    componentDidMount(){
        api.get('posts/top20',).then((res)=>{
            if(res.data.code == 200){
                let articles = res.data.data.map((item,index)=>{return item});
                this.setState({article:articles})
            }
            // console.log(res.data.data);
        })
    }
    render(){
        let articlelist = this.state.article.map((item,index)=>{
            return(
                <ArticleLable key={item.id} data = {item}/>
            )
        });
        console.log(articlelist);
        return(
            <div className="shouyecon">
                <div className="banner">
                    <Carousel autoplay>
                        <div><img src={b123} alt=""/></div>
                        <div><img src={b456} alt=""/></div>
                        <div><img src={b789} alt=""/></div>
                    </Carousel>
                </div>

                <div className="shouyeconlist">
                    <div className="shouyelist">
                        {articlelist}
                    </div>
                    <div className="shouyebtn"></div>
                </div>
            </div>
        )
    }
}
export default Shouye;