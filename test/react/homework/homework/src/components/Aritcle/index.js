import React,{Component} from 'react';
import './article.css';
import {axiosapi as api} from "../../api";
import { Table, Icon, Divider} from 'antd';
import moment from 'moment';
class Article extends Component{
    constructor(props){
        super(props);
        this.state={
            content:"稍等。。。",
            id:"",
            postsid:"",
            title:"",
            username:"河北科技师范学院",
            lookcont:0,
            commentcont:0,
            create_at:0,
            ifreply:"article-count",
            replyshow:"article-replys isshow",
            replyusername:"",
            replytime:"",
            replycontent:"",
            userimg:"https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=5bcc72b5f503918fc3dc359830544df2/f7246b600c338744d3130a29530fd9f9d62aa094.jpg",
            fileList:[],
            tablecol:[{
                title: '文件列表',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="javascript:;">{text}</a>,
            }, {
                title: '',
                key: 'action',
                width:100,
                className:"article-table-col",
                render: (text, record) => (
                    <span>
                        {/*<a href="javascript:;">Action 一 {record.name}</a>*/}
                        {/*<Divider type="vertical" />*/}
                        <a href={`http://120.79.133.95/homeworkapi/api/web/${record.key}`} download={record.name}>下载</a>
                        {/*<Divider type="vertical" />*/}
                    </span>
                ),
            }],
        };
        this.reply = this.reply.bind(this);
        this.downLoad = this.downLoad.bind(this);
    }
    reply() {
        this.props.replybtn(this.props.replyid);
    }
    downLoad(e){
        console.log(e.key);
    }
    componentDidMount(){
        if(this.props.ifreply){
            api.get(`/posts/${this.props.id}`).then((res)=>{
                let article = res.data.data;
                if(!article.content && typeof(article.content)!=="undefined"){
                    this.setState({
                        username:article.userinfo.nickname,
                        userimg:article.userinfo.headpicurl,
                        title:article.title,
                        lookcont:article.lookcont,
                        commentcont:article.commentcont,
                        create_at:article.create_time,
                        introduction:article.introduction,
                    });
                }else {
                    this.setState({
                        content:article.content.content,
                        id:article.content.id,
                        postsid:article.content.postsid,
                        username:article.userinfo.nickname,
                        userimg:article.userinfo.headpicurl,
                        title:article.title,
                        lookcont:article.lookcont,
                        commentcont:article.commentcont,
                        create_at:article.create_time,
                        introduction:article.introduction,
                    });
                }

                this.refs['article-neirong'].innerHTML=this.state.content
            })
        }else {
            api.get(`/reply?id=${this.props.replyid}`).then((res)=>{
                if(!res.data.data[0].replycontent && typeof(res.data.data[0].replycontent)!=="undefined") {
                    this.setState({
                        title: "",
                        content: res.data.data[0].content,
                        ifreply: "article-count reply",
                        create_at: res.data.data[0].createtime,
                        username: res.data.data[0].userinfo.nickname,
                        userimg: res.data.data[0].userinfo.headpicurl
                    });
                    this.refs['article-neirong'].innerHTML=this.state.content
                }else {
                    this.setState({
                        title:"",
                        content:res.data.data[0].content,
                        ifreply:"article-count reply",
                        create_at:res.data.data[0].createtime,
                        username:res.data.data[0].userinfo.nickname,
                        userimg:res.data.data[0].userinfo.headpicurl,
                        replyusername:res.data.data[0].replycontent.userinfo.nickname,
                        replycontent:res.data.data[0].replycontent.content,
                        replytime:res.data.data[0].replycontent.createtime,
                        replyshow:"article-replys"
                    });
                    this.refs['article-neirong'].innerHTML=this.state.content
                }
            })
        }
    }
    render(){
        let table ="";
        if(this.props.filelist.length>0){
            let tabledata = this.props.filelist.map(item=>{
                return {
                    key:item.url,
                    name:item.filename,
                }
            });
            table =  <Table className={'article-table'}
                            pagination={false}
                            columns={this.state.tablecol}
                            dataSource={tabledata}
                            // onRow={(record) => {
                            //     return {
                            //         onClick:()=>{
                            //             api.get(`/file/download?id=${record.key}`).then(
                            //                 res=>{
                            //                     console.log(res.data)
                            //                 }
                            //             )
                            //             // console.log(record)
                            //         },       // 点击行
                            //     };
                            // }}
            />
        }
        let introduction = "";
        if(this.props.ifreply){
            introduction =  <div className="article-introduction">
                {this.state.introduction}
            </div>
        }
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
                    <div className={this.state.ifreply}>
                        <label><Icon type = 'eye-o'/>{this.state.lookcont}</label>
                        <label><Icon type = 'message'/>{this.state.commentcont}</label>
                        <label><span>{moment(moment(this.state.create_at*1000).format("YYYY-MM-DD"),"YYYY-MM-DD").fromNow()}</span></label>
                        <span>{moment(this.state.create_at*1000).format("YYYY-MM-DD HH:mm:ss")}</span>
                    </div>
                    <div className="article-content">
                        <div className={this.state.replyshow}>
                            <div className="article-reply-user">
                                {this.state.replyusername}<span></span>
                                {moment(this.state.replytime*1000).format("YYYY-MM-DD HH:mm:ss")}
                            </div>
                            <div className="article-reply-con">
                                {this.state.replycontent}
                            </div>
                        </div>
                        {introduction}
                        <div ref="article-neirong" className="article-neirong">

                        </div>
                    </div>
                    {table}
                    {this.props.activityinfo}
                    <div className="article-reply">
                        <label onClick={this.reply}>回复</label>
                    </div>
                </div>
            </div>
        )
    }
}
export default Article;