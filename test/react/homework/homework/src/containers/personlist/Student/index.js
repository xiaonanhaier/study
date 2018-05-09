import React,{Component} from 'react'
import './student.css';
import { axiosapi as api} from "../../../api/index";
import {Link} from 'react-router-dom';
import { Card, Icon, Avatar, Table } from 'antd';
import moment from 'moment';
class Student extends Component{
    constructor(props){
        super(props)
        this.state={
            leave:[],
            activity:[]
        }
    }
    componentDidMount() {
        if (this.props.match.params.id !== ':id'){
            api.get(`leave?userid=${this.props.match.params.id}`).then(leave=>{
                this.setState({leave:leave.data.data});
            });
            api.get(`personactivity?userid=${this.props.match.params.id}`).then(activity=>{
                this.setState({activity:activity.data.data});
            })
        }
    }
    render(){
        let data = this.state.leave.map(item=>{
            let status = "审核中。。";
            if (item.states === 1) {
                status =  '通过';
            }
            let starttime = moment.unix(item.starttime).format('YYYY-MM-DD');
            let endtime = moment.unix(item.endtime).format('YYYY-MM-DD');
           return {
                id: item.id,
                time: starttime+"—"+endtime,
                reason: item.reason,
                status: status,
            }
        });
        let activity = this.state.activity.map(activity=>{
           let activityinfo = '未获奖';
           let can = "已参加";
           let deng = "院级";
           if (activity.states === 0){
               can = "未参加";
           }
           if (activity.activity.grade === 1) {
               deng = "校级";
           }
           switch (activity.prize) {
               case 1:
                   activityinfo = "一等奖";
                   break;
               case 2:
                   activityinfo = "二等奖";
                   break;
               case 3:
                   activityinfo = "三等奖";
                   break;
               case 4:
                   activityinfo = "优秀奖";
                   break;
           }
           return {
               id:activity.id,
               time:activity.activity.starttime+"—"+activity.activity.endtime,
               name:<Link to={`/app/detail/${activity.article.id}`}> {activity.article.title}</Link>,
               grade:deng,
               jiang:activityinfo,
               can:can,
           }
        });
        const columns = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"时间",
            dataIndex: 'time',
        }, {
            title:"原因",
            dataIndex: 'reason',
        }, {
            title:"状态",
            dataIndex: 'status',
        }];
        const columns1 = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"活动名称",
            dataIndex: 'name',
        }, {
            title:"活动时间",
            dataIndex: 'time',
        }, {
            title:"等级",
            dataIndex: 'grade',
        },{
            title:"获奖情况",
            dataIndex: 'jiang'
        },{
            title:"是否参加",
            dataIndex: 'can'
        }];
        return(
            <div className="student">
                <Card title="请假信息" className={'person-item'} style={{ width: '100%' }}>
                    <Table pagination={false} bordered columns={columns} dataSource={data} size="small" />
                </Card>
                <Card title="社团活动" className={'person-item'} style={{ width: '100%' }}>
                    <Table pagination={false} bordered columns={columns1} dataSource={activity} size="small" />
                </Card>
            </div>

        )
    }
}
export default Student;