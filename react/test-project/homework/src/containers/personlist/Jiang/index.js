import React,{Component} from 'react'
import { axiosapi as api} from "../../../api/index";
import {Link} from 'react-router-dom';
import './jiang.css';
import { Card, Avatar, Table,Switch, Icon,message, Radio,Modal, Button  } from 'antd';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
class Jiang extends Component{
    constructor(props){
        super(props)
        this.state={
            activity:[],
            activitytitle:"",
            dianji:'',
            disabled:false,
        };
        this.onChange = this.onChange.bind(this);
        this.DiangJi = this.DiangJi.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);

    }
    componentWillMount() {
        if (this.props.match.params.id !== ':id'){
            api.get(`personactivity?activityid=${this.props.match.params.id}&states=1`).then(activity=>{
                let activitylist = activity.data.data.map(activity=>{
                    return {
                        id:activity.id,
                        time:moment.unix(activity.createtime).format('YYYY-MM-DD'),
                        name:<Link to={`/app/person/${activity.userinfo.userid}`}> {activity.userinfo.nickname}</Link>,
                        studentid:activity.userinfo.studentid,
                        tel:activity.userinfo.tel,
                        jiang:activity.prize.toString()
                    }
                });
                this.setState({activity:activitylist});
            });
            api.get(`clubactivity?ariticleid=${this.props.match.params.id}`).then(res=>{
                this.setState({activitytitle:res.data.data[0].article.title})
                if (res.data.data[0].states === 1) {
                    this.setState({disabled:true})
                }
            });
        }
    }
    onChange(e) {
        let jiangdata = {
          prize: e.target.value
        };
        api.put(`personactivity/update?id=${this.state.dianji}`,jiangdata).then(res=>{
            let newactivity = this.state.activity.map(item=>{
                if (item.id === this.state.dianji) {
                    item.jiang = e.target.value;
                }
                return item;
            });
            this.setState({activity:newactivity});
        })

    }
    DiangJi(value) {
        this.setState({dianji:value});
    }
    onOk() {
        api.get(`clubactivity/jiang?articleid=${this.props.match.params.id}`).then(res=>{
            if (res.data.code === 200) {
                message.success('保存成功！');
                this.setState({disabled:true})
            }
        })
    }
    onCancel() {
        console.log('Cancel');
    }
    showConfirm() {
        confirm({
            title: '真的要提交获奖信息吗？',
            content: '提交后不可更改！',
            onOk:this.onOk,
            onCancel: this.onCancel
        });
    }
    render(){
        const columns1 = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"昵称",
            dataIndex: 'name',
        }, {
            title:"学号",
            dataIndex: 'studentid',
        }, {
            title:"报名时间",
            dataIndex: 'time',
        }, {
            title:"联系方式",
            dataIndex: 'tel'
        },{
            title: '奖项设置',
            key: 'action',
            width:260,
            dataIndex: 'jiang',
            className:"article-table-col",
            render: (text, record) => {
                return (
                    <span onClick={()=>this.DiangJi(record.id)}>
                        <RadioGroup key={record.id} disabled={this.state.disabled} onChange={this.onChange} defaultValue={record.jiang} size="small">
                            <RadioButton value="0">未获奖</RadioButton>
                            <RadioButton value="1">一等奖</RadioButton>
                            <RadioButton value="2">二等奖</RadioButton>
                            <RadioButton value="3">三等奖</RadioButton>
                        </RadioGroup>
                    </span>
                )
            },
        }];
        return(
            <div className="jiang">
                <div className="qiandao-title">

                </div>
                <Card title={`${this.state.activitytitle}录入获奖信息`} extra={ <Button onClick={this.showConfirm}>确认</Button>} className={'person-item'} style={{ width: '100%' }}>
                    <Table pagination={false} bordered columns={columns1} dataSource={this.state.activity} size="small" />
                </Card>
            </div>

        )
    }
}
export default Jiang;