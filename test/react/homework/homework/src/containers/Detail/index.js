import React,{Component} from 'react';
import './detail.css';
import {Breadcrumb,Icon,Button, Modal, Input} from 'antd';
import {Link} from 'react-router-dom';
import {Article, Pages} from '../../components';
import {axiosapi as api} from "../../api";
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { TextArea } = Input;
class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            articleid:"",
            parentplate:"",
            parentplatename:"",
            smallplate:"",
            smallplatename:"",
            visible: false,
            confirmLoading: false,
            replytext: '',
            replyid:0,
            replypage:1,
            replycon:[],
            replypagesize:0,
            replytotal:0,
            page:1
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.showModal = this.showModal.bind(this);
        this.reply = this.reply.bind(this);
        this.childShowModal = this.childShowModal.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }
    componentWillMount(){
        let articleid = this.props.match.params.id;
        this.setState({articleid:articleid});
        //获取文章
        api.get(`/posts/${articleid}`).then((res)=>{
            api.get(`/smallplate/${res.data.data.smplate}`).then((re)=>{
                this.setState({
                    parentplate:re.data.data.parent.id,
                    parentplatename:re.data.data.parent.title,
                    smallplate:re.data.data.id,
                    smallplatename:re.data.data.title,
                })
                this.props.actions.plateSelecct(re.data.data.id);
            })
        })
        //获取评论
        api.get(`/reply?articleid=${articleid}&page=${this.state.page}&fields=id`).then((res)=>{
            this.setState({replycon:res.data.data,
                replypagesize:res.headers["x-pagination-per-page"],
                replytotal:res.headers['x-pagination-total-count']})
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    childShowModal(replyid){
        this.setState({
            visible: true,
            replyid:replyid,
        });
    };
    reply(e) {
        this.setState({replytext:e.target.value})
    }
    pageChange(page) {
        this.setState({page:page});
        api.get(`/reply?articleid=${this.state.articleid}&page=${page}&fields=id`).then((res)=>{
            this.setState({replycon:res.data.data})
        })
    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        let data = {
            parentplate:this.state.parentplate,
            smallplate:this.state.smallplate,
            articleid:this.state.articleid,
            content:this.state.replytext,
            replyid:this.state.replyid
        }
        api.post('/reply/create',data).then((res)=>{
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            api.get(`/reply?fields=id&articleid=${this.state.articleid}`).then((res)=>{
                this.setState({replycon:res.data.data})
            })
        })
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    render(){
        let replyarr = this.state.replycon.map(item=>{
            return(
                <Article replyid={item.id} key={item.id} ifreply = {false} replybtn={this.childShowModal}/>
            )
        })
        return(
            <div className="detail">
                <div className="detail-baread">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={'/app'}><Icon type="home" /></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span>{this.state.parentplatename}</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.state.smallplatename}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="detail-btn">
                    <Link to={'/app/edit'}><Button type="primary" icon="edit">发布新帖</Button></Link>
                    <Button type="primary" icon="message" onClick={this.showModal}>回复</Button>
                    <Modal title="回复内容："
                           visible={this.state.visible}
                           onOk={this.handleOk}
                           confirmLoading={this.state.confirmLoading}
                           onCancel={this.handleCancel}
                    >
                        <p><TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} onChange={this.reply}></TextArea></p>
                    </Modal>
                </div>

                <div className="detail-con">
                    <Article id={this.state.articleid} replyid={0} ifreply = {true} replybtn={this.childShowModal}/>
                    {replyarr}
                </div>
                <div className="detail-footer-page">
                    <Pages pagesize={this.state.replypagesize} page={this.state.page} total={this.state.replytotal} onChange={this.pageChange}/>
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
)(Detail);
// export default Detail