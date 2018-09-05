import React,{ Component } from 'react';
import './others.css';
import { Modal, Button, Input, DatePicker } from 'antd';
import { axiosapi as api} from "../../api/index";
const { TextArea } = Input;
const { RangePicker} = DatePicker;
class Others extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            days:0,
            buttonif:false,
        };
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onRangeChange = this.onRangeChange.bind(this);
        this.reasonChange = this.reasonChange.bind(this);
    }
    componentDidMount() {
        let userinfo = JSON.parse(localStorage.userinfo);
        if (userinfo.data[0].identity === 1){
            this.setState({
                college:userinfo.data[0].college,
                profession:userinfo.data[0].profession,
                class:userinfo.data[0].class,
                apartment:userinfo.data[0].apartment,
                dormitory:userinfo.data[0].dormitory
            })
        } else {
            this.setState({buttonif:true})
        }

    }
    showModal(){
        this.setState({
            visible: true,
        });

    };
    reasonChange(e){
        this.setState({reason:e.target.value});
    }
    hideModal(){
        this.setState({
            visible: false,
        });
        if (this.state.days !== 0) {
            let leaveinfo = {
                reason:this.state.reason,
                starttime:this.state.starttime,
                endtime:this.state.endtime,
                days:this.state.days,
                college:this.state.college,
                profession:this.state.profession,
                class:this.state.class,
                apartment:this.state.apartment,
                dormitory:this.state.dormitory,
            };
            api.post('leave/create',leaveinfo).then(res=>{
                console.log(res);
            });
        }
    };
    onRangeChange(date, dateString) {
        let days = date[1].diff(date[0],'days');
        this.setState({
           starttime:date[0].unix(),
           endtime:date[1].unix(),
           days:days,
        });
    }
    render(){
        return(
            <div className="others">
                <div className="others-title">
                    附加功能
                </div>
                <div className="others-con">
                    <Button disabled={this.state.buttonif} type="primary" onClick={this.showModal}>请假</Button>
                    <Modal
                        title="填写信息"
                        visible={this.state.visible}
                        onOk={this.hideModal}
                        onCancel={this.hideModal}
                        okText="确认"
                        cancelText="取消"
                    >
                        <p>请假原因：<TextArea onChange={this.reasonChange} autosize /></p>
                        <p>请假时间： <RangePicker onChange={this.onRangeChange} />     {this.state.days}天</p>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default Others;