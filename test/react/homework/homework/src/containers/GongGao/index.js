import React,{Component} from 'react';
import "./gonggao.css";
import { Pages, GongGaoItem} from "../../components/index";
import { Icon } from 'antd';
import { axiosapi as api} from "../../api/index";
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class GongGao extends Component{
    constructor(props) {
        super(props)
        this.state={
            pagesize:0,
            page:1,
            totalcount:0,
            articlelist:[]
        };
        this.onChange = this.onChange.bind(this);
        this.newposts = this.newposts.bind(this);
    }
    componentDidMount() {
        api.get(`/posts?plateid=3`).then(res=>{
            this.setState({articlelist:res.data.data,pagesize:res.headers["x-pagination-per-page"],
                totalcount:res.headers['x-pagination-total-count']})
        })
    }
    onChange(page){
        this.setState({page:page})
        api.get(`posts/top20?page=${page}`).then((res)=>{
            if(res.data.code === 200){
                let articles = res.data.data.map((item,index)=>{return item});
                this.setState({article:articles});
            }
        })
    }
    newposts(){
        this.props.actions.newposts(true);
    }
    render(){
        const gonggaoitems = this.state.articlelist.map(item=>{
            return(
                <GongGaoItem
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
                    articleintroduction = {item.introduction}
                    articletitleimg = {item.titleimg}
                />
            )
        });
        return(
            <div className={"gonggao"}>
                <div className="gonggaolist">
                    <div className="platetit">
                        校园公告
                    </div>
                    <div className="platelistconlist">
                        <div className="gonggaolistlist">
                            {gonggaoitems}
                            <Pages pagesize={this.state.pagesize} page={this.state.page} total={this.state.totalcount} onChange={this.onChange}/>
                        </div>
                        <div className="platelistbtn">
                            <div className="shouyenew" onClick={this.newposts}>
                                <Icon type="edit" />  发表新帖
                            </div>
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
)(GongGao);
