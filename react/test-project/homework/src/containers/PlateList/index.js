import React,{Component} from 'react';
import "./platelist.css";
import { Icon,Card } from 'antd';
import {Link} from 'react-router-dom';
import {Pages, ArticleItem} from "../../components/index";
import { axiosapi as api} from "../../api/index";
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {message} from "antd/lib/index";
class PlateList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pagesize:0,
            page:1,
            totalcount:0,
            articlelist:[],
            platelist:[],
        };
        this.onChange = this.onChange.bind(this);
        this.newposts = this.newposts.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const skuId =nextProps.match.params.id;
        api.get(`/posts?plateid=${skuId}`).then(res=>{
            this.setState({articlelist:res.data.data,pagesize:res.headers["x-pagination-per-page"],
                totalcount:res.headers['x-pagination-total-count']})
        });
        api.get(`plate?id=${skuId}`).then(ress=>{
            this.setState({platename:ress.data.data[0].title})
        });
        api.get('plate').then(res=>{
            this.setState({platelist:res.data.data})
        })
    }
    componentWillMount() {
        api.get(`/posts?plateid=${this.props.match.params.id}`).then(res=>{
            this.setState({articlelist:res.data.data,pagesize:res.headers["x-pagination-per-page"],
                totalcount:res.headers['x-pagination-total-count']})
        });
        api.get(`plate?id=${this.props.match.params.id}`).then(ress=>{
            this.setState({platename:ress.data.data[0].title})
        });
        api.get('plate').then(res=>{
            this.setState({platelist:res.data.data})
        })
    }
    onChange(page){
        this.setState({page:page});
        api.get(`posts/?page=${page}&plateid=${this.props.match.params.id}`).then((res)=>{
            this.setState({articlelist:res.data.data});
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
            return <p key={item.id}><Link key={item.id} to={`/app/platelist/${item.id}`}>{item.title}</Link> </p>
        });
        const articleitems = this.state.articlelist.map(item=>{
            if (item.plateid === 2){
                if (item.states === 1 && item.states !== 2){
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
                }
            }else {
                if (item.states !== 2){
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
                }
            }
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