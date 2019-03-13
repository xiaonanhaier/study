import React,{Component} from 'react'
import { axiosapi as api} from "../../../api/index";
import {Link} from 'react-router-dom';
import './qiandao.css';
import { Card, Avatar, Table,Switch, Icon,message } from 'antd';
import moment from 'moment';
class Qiandao extends Component{
    constructor(props){
        super(props)
        this.state={
            activity:[],
            activitytitle:""
        };
        this.QianDao = this.QianDao.bind(this);
    }
    componentWillMount() {
        if (this.props.match.params.id !== ':id'){
            api.get(`personactivity?activityid=${this.props.match.params.id}`).then(activity=>{
                let activitylist = activity.data.data.map(activity=>{
                    let status = false;
                    if (activity.states === 1){
                        status = true;
                    }
                    return {
                        id:activity.id,
                        time:moment.unix(activity.createtime).format('YYYY-MM-DD'),
                        name:<Link to={`/app/person/${activity.userinfo.userid}`}> {activity.userinfo.nickname}</Link>,
                        studentid:activity.userinfo.studentid,
                        tel:activity.userinfo.tel,
                        states:status
                    }
                });
                this.setState({activity:activitylist});
            });
            api.get(`clubactivity?ariticleid=${this.props.match.params.id}`).then(res=>{
               this.setState({activitytitle:res.data.data[0].article.title})
            });
        }
    }
    QianDao (id) {
        api.get(`personactivity/qiandao?id=${id}`).then(res=>{
           if (res.data.code === 200) {
               let newactivity = this.state.activity.map(item=>{
                   if (item.id === id) {
                       item.states = !item.states;
                   }
                   return item;
               });
               this.setState({activity:newactivity});
               message.success('成功！');
           }
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
            title: '签到',
            key: 'action',
            width:100,
            dataIndex: 'states',
            className:"article-table-col",
            render: (text, record) => {
                return (
                    <span onClick={()=>this.QianDao(record.id)}>
                        <Switch checkedChildren="已签到" unCheckedChildren="未签到" checked={record.states}/>
                    </span>
                )
            },
        }];
        return(
            <div className="qiandao">
                <div className="qiandao-title">

                </div>
                <Card title={`${this.state.activitytitle}签到`} className={'person-item'} style={{ width: '100%' }}>
                    <Table pagination={false} bordered columns={columns1} dataSource={this.state.activity} size="small" />
                </Card>
            </div>

        )
    }
}
export default Qiandao;