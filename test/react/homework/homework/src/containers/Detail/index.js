import React,{Component} from 'react';
import './detail.css';
import {Breadcrumb,Icon,Button, Modal, Input, message} from 'antd';
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
            page:1,
            fileList:[],
            ifbaoming:false,
            activityone:0,
            activitytwo:0,
            activitythree:0,
            activityothers:0,
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.showModal = this.showModal.bind(this);
        this.reply = this.reply.bind(this);
        this.childShowModal = this.childShowModal.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.baoMing = this.baoMing.bind(this);
        this.edit = this.edit.bind(this);
    }
    componentWillMount(){
        let articleid = this.props.match.params.id;
        this.setState({articleid:articleid});
        //获取文章
        api.get(`/posts/${articleid}`).then((res)=>{
            this.setState({userid:res.data.data.userid});
            api.get(`/smallplate/${res.data.data.smplate}`).then((re)=>{
                this.setState({
                    parentplate:re.data.data.parent.id,
                    parentplatename:re.data.data.parent.title,
                    smallplate:re.data.data.id,
                    smallplatename:re.data.data.title,
                });
                this.props.actions.plateSelecct(re.data.data.id);
                if (re.data.data.parent.id === 2){
                    api.get(`/clubactivity?articleid=${articleid}`).then(activiy=>{
                        this.setState({
                           activityid:activiy.data.data[0].id,
                           activitystart:activiy.data.data[0].starttime,
                           activityend:activiy.data.data[0].endtime,
                            activityone:activiy.data.data[0].firstprize,
                            activitytwo:activiy.data.data[0].secondaward,
                            activitythree:activiy.data.data[0].thirdaward,
                            activityothers:activiy.data.data[0].award,
                        });
                        console.log(activiy);
                        api.get(`/personactivity/activity?activityid=${activiy.data.data[0].id}$userid=${this.props.state.async.userinfo.data[0].userid}`).then(baoming=>{
                            if(baoming.data.data >= 1){
                                this.setState({ifbaoming:true})
                            }
                        })
                    })

                }
            })
        });
        //获取评论
        api.get(`/reply?articleid=${articleid}&page=${this.state.page}&fields=id`).then((res)=>{
            this.setState({replycon:res.data.data,
                replypagesize:res.headers["x-pagination-per-page"],
                replytotal:res.headers['x-pagination-total-count']})
        });

        //获取文件列表
        api.get(`/file?articleid=${articleid}&usetype=file`).then(filelist=>{
            this.setState({fileList:filelist.data.data});
        });

        let lookdata = {id:this.props.match.params.id};
        api.post('/posts/look',lookdata).then(res=>{})
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
        };
        api.post('/reply/create',data).then((res)=>{
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            let replydata = {id:this.props.match.params.id};
            api.post('/posts/reply',replydata).then(resd=>{})
            api.get(`/reply?fields=id&articleid=${this.state.articleid}`).then((res)=>{
                this.setState({replycon:res.data.data})
            })
        })
    };
    baoMing() {
        let baomingdata = {
            activityid:this.state.articleid
        };
        api.post('personactivity',baomingdata).then(baoming=>{
            if (baoming.data.code === 201){
                this.setState({ifbaoming:true})
            }
        })
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    edit(){
        this.props.history.push(`/app/editupdate/${this.state.articleid}`)
    }
    render(){
        let userinfo = JSON.parse(localStorage.userinfo);
        let edit = "";
        if (userinfo.data[0].userid === this.state.userid) {
            edit = <Button type="primary" onClick={this.edit}>编辑</Button>
        }
        let replyarr = this.state.replycon.map(item=>{
            return(
                <Article replyid={item.id} filelist={this.state.fileList} key={item.id} ifreply = {false} replybtn={this.childShowModal}/>
            )
        });
        let baoming = "";
        let activetyinfo = "";
        if(this.state.parentplate === 2){
            if(this.state.ifbaoming){
                baoming = <Button type="primary" disabled>已报名</Button>
            }else{
                baoming = <Button type="primary" onClick={this.baoMing}>报名</Button>
            }
            activetyinfo = <div>
                <strong style={{color:"#1890ff"}}>
                    活动时间
                </strong>
                <p>
                    {this.state.activitystart} - {this.state.activityend}
                </p>
                <strong style={{color:"#1890ff"}}>
                    奖项设置<br/>
                </strong>
                一等奖：{this.state.activityone} 个<br/>
                二等奖：{this.state.activitytwo} 个<br/>
                三等奖：{this.state.activitythree} 个<br/>
                优秀奖：{this.state.activityothers} 个<br/>
            </div>
        }
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
                    {baoming}{edit}
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
                    <Article activityinfo={activetyinfo} id={this.state.articleid} filelist={this.state.fileList} replyid={0} ifreply = {true} replybtn={this.childShowModal}/>
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