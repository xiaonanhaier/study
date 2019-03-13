import React,{Component} from 'react'
import './st.css';
import { axiosapi as api} from "../../../api/index";
import {Link} from 'react-router-dom';
import { Card, Icon, Avatar, Table, Popconfirm } from 'antd';
import moment from 'moment';
class Shet extends Component{
    constructor(props){
        super(props)
        this.state={
            activitylist:[],
            activitystates:0,
        }
    }
    componentDidMount() {
        if (this.props.match.params.id !== ':id'){
            api.get(`clubactivity?userid=${this.props.match.params.id}`).then(activity=>{
                this.setState({activitylist:activity.data.data});
            });
        }
    }
    render(){
        let activity = this.state.activitylist.map(item=>{
            let states = '未开始';
            if (moment().isBetween(item.starttime,item.endtime)){
                states = "活动中"
            }
            if (moment().isAfter(item.endtime)){
                states = '已结束'
            }
            let deng = "院级";
            if (item.grade === 1) {
                deng = "校级";
            }
            let shehe = '审核中...';
            if (item.article.states  === 1){
                shehe = "通过"
            }
           return {
               id:item.article.id,
               name:item.article.title,
               time:item.starttime+"—"+item.endtime,
               grade:deng,
               bao:item.registercont,
               states1:shehe,
               states:states
           }
        });
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
        }, {
            title:"报名人数",
            dataIndex: 'bao',
        }, {
            title:"审核状态",
            dataIndex: 'states1',
        },{
            title:"状态",
            dataIndex: 'states'
        },{
            title: '操作',
                key: 'action',
                width:100,
                className:"article-table-col",
                render: (text, record) => {
                if (record.states === '未开始'){
                    return <Link to={`/app/qiandao/${record.id}`}>报名情况</Link>
                }
                if(record.states === '活动中') {
                    return (
                        <Link to={`/app/qiandao/${record.id}`}>签到</Link>
                    )
                }
                if(record.states === "已结束") {
                    return (
                        <Link to={`/app/jiang/${record.id}`}>奖项设置</Link>
                    )
                }

            },
        }];
        return(
            <div className="student">
                <Card title="我的活动" className={'person-item'} style={{ width: '100%' }}>
                    <Table pagination={false} bordered columns={columns1} dataSource={activity} size="small" />
                </Card>
            </div>

        )
    }
}
export default Shet;