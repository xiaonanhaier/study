import React,{Component} from 'react';
import './article.css';
import {axiosapi as api} from "../../api";
import {Icon} from 'antd';
import moment from 'moment';
class Article extends Component{
    constructor(props){
        super(props);
        this.state={
            content:"稍等。。。",
            id:"",
            postsid:"",
            title:"河北科技师范学院",
            username:"河北科技师范学院",
            lookcont:0,
            commentcont:0,
            create_at:0,
            userimg:"https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=5bcc72b5f503918fc3dc359830544df2/f7246b600c338744d3130a29530fd9f9d62aa094.jpg"
        }
    }
    componentDidMount(){
        if(this.props.id){
            api.get(`/posts/${this.props.id}`).then((res)=>{
                let article = res.data.data;
                this.setState({
                    content:article.content.content,
                    id:article.content.id,
                    postsid:article.content.postsid,
                    username:article.userInfo.nickname,
                    userimg:article.userInfo.headpicurl,
                    title:article.title,
                    lookcont:article.lookcont,
                    commentcont:article.commentcont,
                    create_at:article.create_at
                });
            })
        }
    }
    render(){
        return(
            <div className="article">
                <div className="article-user">
                    <img src={this.state.userimg} alt=""/>
                    <div className="user-name">
                        <div className="authi z">
                            <a href="space-uid-614784617.html" target="_blank" className="xw1">{this.state.username}</a>
                        </div>
                    </div>
                </div>
                <div className="article-con">
                    <h1 className="article-tit">
                        {this.state.title}
                    </h1>
                    <div className="article-count">
                        <label><Icon type = 'eye-o'/>{this.state.lookcont}</label>
                        <label><Icon type = 'message'/>{this.state.commentcont}</label>
                        <span>{moment(moment(this.state.create_at).format("YYYY-MM-DD HH:mm:ss"),"YYYYMMDD").fromNow()}</span>
                    </div>
                    {this.state.content}
                </div>
            </div>
        )
    }
}
export default Article;