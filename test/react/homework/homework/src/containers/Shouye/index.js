import React,{Component} from 'react';
import "./shouye.css";
import { Carousel, Icon } from 'antd';
import b123 from '../../common/images/123.jpg';
import b456 from '../../common/images/456.jpg';
import b789 from '../../common/images/789.jpg';
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
            // console.log(res.data.data);
        })
    }
    newposts(){
        this.props.actions.newposts(true);
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
        let articlelist = this.state.article.map((item,index)=>{
            return(
                <ArticleLable key={item.id} data = {item}/>
            )
        });
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
                        <Pages pagesize={this.state.pagesize} page={this.state.page} total={this.state.totalcount} onChange={this.onChange}/>
                    </div>
                    <div className="shouyebtn">
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
)(Shouye);