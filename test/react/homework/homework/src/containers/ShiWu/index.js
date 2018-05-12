import React,{Component} from 'react';
import "./shouye.css";
import { Carousel, Icon, Tabs,Card } from 'antd';
// import {Editor} from "../../components/index";
import {Link} from 'react-router-dom';
import {ArticleLable,Pages,Shiwuittem} from "../../components/index";
import { axiosapi as api} from "../../api/index";
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const TabPane = Tabs.TabPane;
class ShiWu extends Component{
    constructor(props){
        super(props);
        this.state = {
            article1:[],
            article2:[],
            page1:1,
            page2:1,
            totalcount1:0,
            totalcount2:0,
            pagesize1:0,
            pagesize2:0,
            platelist:[]
        };
        this.onChange1 = this.onChange1.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.newposts = this.newposts.bind(this);
    }
    componentDidMount(){
        api.get(`lostfound/?type=1`).then((res)=>{
            if(res.data.code === 200){
                let articles = res.data.data.map((item,index)=>{return item});
                this.setState({article1:articles,
                pagesize1:res.headers["x-pagination-per-page"],
                totalcount1:res.headers['x-pagination-total-count']});
            }
        });
        api.get(`lostfound/?type=2`).then((res)=>{
            if(res.data.code === 200){
                let articles = res.data.data.map((item,index)=>{return item});
                this.setState({article2:articles,
                    pagesize2:res.headers["x-pagination-per-page"],
                    totalcount2:res.headers['x-pagination-total-count']});
            }
            console.log(res.data.data);
        });
        api.get('plate').then(res=>{
            this.setState({platelist:res.data.data})
        })
    }
    newposts(){
        this.props.actions.newposts(true);
    }
    onChange1(page){
        this.setState({page1:page});
        api.get(`lostfound?page=${page}&type=1`).then((res)=>{
            if(res.data.code === 200){
                let articles = res.data.data.map((item,index)=>{return item});
                this.setState({article1:articles});
            }
        })
    }
    onChange2(page){
        this.setState({page2:page});
        api.get(`lostfound?page=${page}&type=1`).then((res)=>{
            if(res.data.code === 200){
                let articles = res.data.data.map((item,index)=>{return item});
                this.setState({article2:articles});
            }
        })
    }
    render(){
        let platelist = this.state.platelist.map(item=>{
            return <p><Link key={item.id} to={`/app/platelist/${item.id}`}>{item.title}</Link> </p>
        });
        let articlelist1 = this.state.article1.map((item,index)=>{
            return(
                <Shiwuittem img={item.article.titleimg}
                            introduction={item.article.introduction}
                            time={item.time}
                            tel={item.tel}
                            address={item.address}
                            title={item.article.title}
                            articleid={item.article.id}
                            history={this.props.history}
                />
            )
        });
        let articlelist2 = this.state.article2.map((item,index)=>{
            return(
                <Shiwuittem img={item.article.titleimg}
                            introduction={item.article.introduction}
                            time={item.time}
                            tel={item.tel}
                            address={item.address}
                            title={item.article.title}
                            articleid={item.article.id}
                            history={this.props.history}
                />
            )
        });
        return(
            <div className="shiwu">
                <div className="platetit">
                    失物招领
                </div>
                <div className="shouyeconlist">
                    <div className="shiwulist">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="失物招领" key="1">
                                    <div className="shiwulist-con">
                                        {articlelist1}
                                    </div>
                                    <Pages pagesize={this.state.pagesize1} page={this.state.page1} total={this.state.totalcount1} onChange={this.onChange1}/>
                            </TabPane>
                            <TabPane tab="丢失物品" key="2">
                                    <div className="shiwulist-con">
                                        {articlelist2}
                                    </div>
                                    <Pages pagesize={this.state.pagesize2} page={this.state.page2} total={this.state.totalcount2} onChange={this.onChange2}/>
                            </TabPane>
                        </Tabs>
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
)(ShiWu);