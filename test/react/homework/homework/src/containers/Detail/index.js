import React,{Component} from 'react';
import './detail.css';
import {Breadcrumb,Icon,Button, Modal, Input } from 'antd';
import {Link} from 'react-router-dom';
import {Article} from '../../components';
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
            ModalText: 'Content of the modal',
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.showModal = this.showModal.bind(this);
    }
    componentWillMount(){
        let articleid = this.props.match.params.id;
        this.setState({articleid:articleid});
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
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    render(){
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
                        <p><TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} /></p>
                    </Modal>
                </div>

                <div className="detail-con">
                    <Article id={this.state.articleid} ifreply = {true}/>
                    <Article/>
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