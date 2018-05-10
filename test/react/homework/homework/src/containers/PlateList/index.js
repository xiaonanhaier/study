import React,{Component} from 'react';
import "./platelist.css";
import { Icon } from 'antd';
import {Pages, ArticleItem} from "../../components/index";
import { axiosapi as api} from "../../api/index";
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
        this.newposts = this.newposts.bind(this);
    }
    componentDidMount() {
        api.get(`/posts?plateid=${this.props.match.params.id}`).then(res=>{
            this.setState({articlelist:res.data.data,pagesize:res.headers["x-pagination-per-page"],
                totalcount:res.headers['x-pagination-total-count']})
        });
        api.get(`plate?id=${this.props.match.params.id}`).then(ress=>{
            this.setState({platename:ress.data.data[0].title})
        })
    }
    onChange(page){
        this.setState({page:page});
        api.get(`posts/?page=${page}&plateid=${this.props.match.params.id}`).then((res)=>{
            this.setState({articlelist:res.data.data});
        })
    }
    newposts(){
        this.props.actions.newposts(true);
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
                    {this.state.platename}
                </div>
                <div className="platelistconlist">
                    <div className="platelistlist">
                        {articleitems}
                        <Pages pagesize={this.state.pagesize} page={this.state.page} total={this.state.totalcount} onChange={this.onChange}/>
                    </div>
                    <div className="platelistbtn">
                        <div className="shouyenew" onClick={this.newposts}>
                            <Icon type="edit" />  发表新帖
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlateList);