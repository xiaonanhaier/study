import React,{Component} from 'react';
import "./gonggao.css";
import { Pages, GongGaoItem} from "../../components/index";
import { Icon,Card } from 'antd';
import {Link} from 'react-router-dom';
import { axiosapi as api} from "../../api/index";
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {message} from "antd/lib/index";
class GongGao extends Component{
    constructor(props) {
        super(props)
        this.state={
            pagesize:0,
            page:1,
            totalcount:0,
            articlelist:[],
            platelist:[]
        };
        this.onChange = this.onChange.bind(this);
        this.newposts = this.newposts.bind(this);
    }
    componentDidMount() {
        api.get(`/posts?plateid=3`).then(res=>{
            this.setState({articlelist:res.data.data,pagesize:res.headers["x-pagination-per-page"],
                totalcount:res.headers['x-pagination-total-count']})
        });
        api.get('plate').then(res=>{
            this.setState({platelist:res.data.data})
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
        let userinfo = JSON.parse(localStorage.userinfo);
        if (userinfo.data[0].identity !== 1){
            if (userinfo.data[0].states !== 1){
                message.error('账号审核中。。。')
            }else {
                this.props.actions.newposts(true);
            }
        }else {
            this.props.actions.newposts(true);
        }
    }
    render(){
        let platelist = this.state.platelist.map(item=>{
            return <p><Link key={item.id} to={`/app/platelist/${item.id}`}>{item.title}</Link> </p>
        });
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
                        学生公告
                    </div>
                    <div className="platelistconlist">
                        <div className="gonggaolistlist">
                            {gonggaoitems}
                            <Pages pagesize={this.state.pagesize} page={this.state.page} total={this.state.totalcount} onChange={this.onChange}/>
                        </div>
                        <div className="platelistbtn">
                            <div className="shouyenew" onClick={this.newposts}>
                                <Icon type="edit" />  写文章
                            </div>
                            <div className="platelist">
                                <Card title="导航"  style={{ width: 300 }}>
                                    {platelist}
                                </Card>
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
