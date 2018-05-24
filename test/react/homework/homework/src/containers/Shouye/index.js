import React,{Component} from 'react';
import "./shouye.css";
import { Carousel, Icon,Card ,message} from 'antd';
import {Link} from 'react-router-dom';
// import {Editor} from "../../components/index";
import {ArticleLable,Pages} from "../../components/index";
import { axiosapi as api} from "../../api/index";
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Shouye extends Component{
    constructor(props){
        super(props);
        this.state = {
            article:[],
            page:1,
            totalcount:0,
            pagesize:0,
            platelist:[],
        };
        this.onChange = this.onChange.bind(this);
        this.newposts = this.newposts.bind(this);
    }
    componentDidMount(){
        api.get(`posts/top20?page=${this.state.page}`).then((res)=>{
            if(res.data.code === 200){
                let articles = res.data.data.map((item,index)=>{return item});
                this.setState({article:articles,
                pagesize:res.headers["x-pagination-per-page"],
                totalcount:res.headers['x-pagination-total-count']});
            }
        });
        api.get('plate').then(res=>{
            this.setState({platelist:res.data.data})
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
    onChange(page){
        this.setState({page:page})
        api.get(`posts/top20?page=${page}`).then((res)=>{
            if(res.data.code === 200){
                let articles = res.data.data.map((item,index)=>{return item});
                this.setState({article:articles});
            }
        })
    }
    render(){
        let platelist = this.state.platelist.map(item=>{
            return <p key={item.id}><Link key={item.id} to={`/app/platelist/${item.id}`}>{item.title}</Link> </p>
        });
        let bannerlist = [];
        let articlelist = this.state.article.map((item,index)=>{
            
            if (item.plateid === 2){
                if (item.states === 1){
                    if (item.titleimg !== ""){
                        bannerlist.push(item);
                    }
                    return(
                        <ArticleLable key={item.id} data = {item}/>
                    )
                }
            }else {
                if (item.titleimg !== ""){
                    bannerlist.push(item);
                }
                return(
                    <ArticleLable key={item.id} data = {item}/>
                )
            }

        });
        let banner = bannerlist.map(item=>{
            return <Link key={item.id} to={`/app/detail/${item.id}`}>
                <div>
                    <img src={item.titleimg} alt=""/>
                </div>
            </Link>
        });
        return(
            <div className="shouyecon">
                <div className="banner">
                    <Carousel autoplay>
                        {banner}
                    </Carousel>
                </div>

                <div className="shouyeconlist">
                    <div className="shouyelist">
                        {articlelist}
                        <Pages pagesize={this.state.pagesize} page={this.state.page} total={this.state.totalcount} onChange={this.onChange}/>
                    </div>
                    <div className="shouyebtn">
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
)(Shouye);