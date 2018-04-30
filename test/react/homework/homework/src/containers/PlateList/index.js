import React,{Component} from 'react';
import "./platelist.css";
import {axiosapi as api} from "../../api";
import {Pages, ArticleItem} from "../../components/index";
class PlateList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pagesize:0,
            page:1,
            totalcount:0,
            articlelist:[]
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        api.get(`/posts?plateid=${this.props.match.params.id}`).then(res=>{
            this.setState({articlelist:res.data.data,pagesize:res.headers["x-pagination-per-page"],
                totalcount:res.headers['x-pagination-total-count']})
        })
    }
    onChange(page){
        this.setState({page:page});
        api.get(`posts/?page=${page}`).then((res)=>{
            this.setState({articlelist:res.data.data});
        })
    }
    render(){
        const articleitems = this.state.articlelist.map(item=>{
           return(
               <ArticleItem
                    key={item.id}
                    articleid = {item.id}
                    articlename = {item.title}
                    articlesmplateid = {item.smplate}
                    articlelookcont = {item.lookcont}
                    articleuserid = {item.userinfo.id}
                    articletopicid = {item.topicid}
                    articleusername = {item.userinfo.nickname}
                    articleuserimg = {item.userinfo.headpicurl}
                    articlecommentcont = {item.commentcont}
               />
           )
        });
        return(
            <div className="platelist">
                <div className="platetit">
                    校园新闻
                </div>
                <div className="platelistconlist">
                    <div className="platelistlist">
                        {articleitems}
                        <Pages pagesize={this.state.pagesize} page={this.state.page} total={this.state.totalcount} onChange={this.onChange}/>
                    </div>
                    <div className="platelistbtn"></div>
                </div>
            </div>
        )
    }
}
export default PlateList;