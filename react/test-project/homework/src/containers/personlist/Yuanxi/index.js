import React,{Component} from 'react'
import './yuanxi.css';
// import { axiosapi as api} from "../../../api/index";
import {Link} from 'react-router-dom';
import { axiosapi as api} from "../../../api/index";
import { Table, Input, Button, Icon, Card,Popconfirm,message } from 'antd';
import moment from 'moment';
const Search = Input.Search;
class Yuanxi extends Component{
    constructor(props){
        super(props)
        this.state={
            classs:[],
            activity:[],
            filterDropdownVisible: false,
            data:[],
            searchText: '',
            filtered: false,
            shetuanlist:[],
            teacherlist:[],
            banlist:[],
            activitylsit:[],
            activitylist:[]
        };
        this.toJiejin = this.toJiejin.bind(this);
        this.toJinzhi = this.toJinzhi.bind(this);
        this.onToexamine = this.onToexamine.bind(this);
        this.onSerrch = this.onSerrch.bind(this);
        this.toShenhe = this.toShenhe.bind(this);
        this.toPostsShen = this.toPostsShen.bind(this);
    }
    componentDidMount() {
        if (this.props.match.params.id !== ':id'){
            api.get('leave/classyuan').then(leave=>{
                let data = leave.data.data.map(item=>{
                    let status = "审核中。。";
                    let mestatus = "审核中。。";
                    if (item.states === 1) {
                        status =  '通过';
                    }
                    if(item.two === 1) {
                        mestatus = '通过';
                    }
                    let starttime = moment.unix(item.starttime).format('YYYY-MM-DD');
                    let endtime = moment.unix(item.endtime).format('YYYY-MM-DD');
                    return {
                        id: item.id,
                        student:item.userinfo.studentid,
                        time: starttime+"—"+endtime,
                        reason: item.reason,
                        status: status,
                        mestatus:mestatus
                    }
                });
                this.setState({data:data});
            });
            api.get('adminuserinfo/yuanxis?expand=shetuan').then(res=>{
                this.setState({shetuanlist:res.data.data})
            });
            api.get('adminuserinfo/yuanxit').then(res=>{
                this.setState({teacherlist:res.data.data})
            });
            api.get('adminuserinfo/yuanxib').then(res=>{
                this.setState({banlist:res.data.data})
            });
            api.get(`clubactivity/yuanhuo`).then(activity=>{
                this.setState({activitylist:activity.data.data});
            });
        }
    }
    toJinzhi(id){
        api.get(`adminuserinfo/yuanj?id=${id}`).then(res=>{
            if (res.data.code === 200) {
                message.success('成功！')
            }
        })
    }
    toPostsShen(id){
        api.get(`posts/shenhe?id=${id}`).then(res=>{
            if (res.data.code === 200) {
                message.success('成功！')
            }
            api.get(`clubactivity/yuanhuo`).then(activity=>{
                this.setState({activitylist:activity.data.data});
            });
        })
    }
    toShenhe(id){
        api.get(`adminuserinfo/shenhe?id=${id}`).then(res=>{
            if (res.data.code === 200) {
                message.success('成功！')
            }
            api.get('adminuserinfo/yuanxis?expand=shetuan').then(res=>{
                this.setState({shetuanlist:res.data.data})
            });
            api.get('adminuserinfo/yuanxit').then(res=>{
                this.setState({teacherlist:res.data.data})
            });
            api.get('adminuserinfo/yuanxib').then(res=>{
                this.setState({banlist:res.data.data})
            })
        })
    }
    toJiejin(id){
        api.get(`adminuserinfo/yuanh?id=${id}`).then(res=>{
            if (res.data.code === 200) {
                message.success('成功！')
            }
        })
    }
    onToexamine(id){
        api.get(`/leave/toexamine?id=${id}`).then(res=>{
            if (res.data.code === 200) {
                message.success('成功！')
            }
        })
    }
    onSerrch(value){
        api.get(`personactivity/yuan?studentid=${value}`).then(res=>{
            this.setState({activitylsit:res.data.data})
        })
    }
    render(){
        let shetuandata = this.state.shetuanlist.map(item=>{
           return {
               id:item.id,
               name:item.nickname,
               she:item.shetuan.name,
               tel:item.tel,
               states1:item.states,
               states:item.userstates.status
           }
        });
        let teacherdata = this.state.teacherlist.map(item=>{
            let claslist = "";
            if (item.teacher !== null){
                item.teacher.map(cla=>{
                    claslist = `${claslist}${cla.organ.parent.name}${cla.organ.name} ; `;
                });
            }
            return {
                id:item.id,
                name:item.nickname,
                tel:item.tel,
                states1:item.states,
                states:item.userstates.status,
                description:claslist
            }

        });
        let bandata = this.state.banlist.map(item=>{
            let claslist ="";
            if (item.ban !== null){
                claslist = `${item.ban.organ.parent.name}${item.ban.organ.name} ; `;
            }
            return {
                id:item.id,
                name:item.nickname,
                tel:item.tel,
                states1:item.states,
                states:item.userstates.status,
                description:claslist
            }
        });
        const columns = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"时间",
            dataIndex: 'time',
        }, {
            title:"学号",
            dataIndex: 'student',
        },{
            title:"原因",
            dataIndex: 'reason',
        }, {
            title:"状态",
            dataIndex: 'status',
        }, {
            title:"我的审核",
            dataIndex: 'mestatus',
        }, {
            title: '操作',
            key: 'action',
            width:100,
            className:"article-table-col",
            render: (text, record) => {
                return(
                    record.mestatus !== "通过" ?(
                            <Popconfirm title="确认通过？" onConfirm={() => this.onToexamine(record.id)}>
                                <a href="javascript:;">通过！</a>
                            </Popconfirm>
                        ):null
                    )
            },
        }];
        const shetuan = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"昵称",
            dataIndex: 'name',
        },{
            title:"对应的社团",
            dataIndex: 'she',
        },{
            title:"联系方式",
            dataIndex: 'tel',
        }, {
            title: '审核',
            key: 'action1',
            width:100,
            dataIndex: 'states1',
            className:"article-table-col",
            render: (text, record) => {
                return(
                    record.states1 === 0 ?(
                        <Popconfirm title="通过？" onConfirm={() => this.toShenhe(record.id)}>
                            <a href="javascript:;">通过！</a>
                        </Popconfirm>
                    ):"已通过"
                )
            },
        }, {
            title: '操作',
            key: 'action',
            width:100,
            dataIndex: 'states',
            className:"article-table-col",
            render: (text, record) => {
                return(
                    record.states === 10 ?(
                        <Popconfirm title="确认？" onConfirm={() => this.toJinzhi(record.id)}>
                            <a href="javascript:;">禁止登陆！</a>
                        </Popconfirm>
                    ):<Popconfirm title="接触禁止？" onConfirm={() => this.toJiejin(record.id)}>
                        <a href="javascript:;">解禁！</a>
                    </Popconfirm>
                )
            },
        }];
        const teacher = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"昵称",
            dataIndex: 'name',
        },{
            title:"联系方式",
            dataIndex: 'tel',
        }, {
            title: '审核',
            key: 'action1',
            width:100,
            dataIndex: 'states1',
            className:"article-table-col",
            render: (text, record) => {
                return(
                    record.states1 === 0 ?(
                        <Popconfirm title="通过？" onConfirm={() => this.toShenhe(record.id)}>
                            <a href="javascript:;">通过！</a>
                        </Popconfirm>
                    ):"已通过"
                )
            },
        }, {
            title: '操作',
            key: 'action',
            width:100,
            dataIndex: 'states',
            className:"article-table-col",
            render: (text, record) => {
                return(
                    record.states === 10 ?(
                        <Popconfirm title="确认？" onConfirm={() => this.toJinzhi(record.id)}>
                            <a href="javascript:;">禁止登陆！</a>
                        </Popconfirm>
                    ):<Popconfirm title="接触禁止？" onConfirm={() => this.toJiejin(record.id)}>
                        <a href="javascript:;">解禁！</a>
                    </Popconfirm>
                )
            },
        }];
        const ban = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"昵称",
            dataIndex: 'name',
        },{
            title:"联系方式",
            dataIndex: 'tel',
        }, {
            title: '审核',
            key: 'action1',
            width:100,
            dataIndex: 'states1',
            className:"article-table-col",
            render: (text, record) => {
                return(
                    record.states1 === 0 ?(
                        <Popconfirm title="通过？" onConfirm={() => this.toShenhe(record.id)}>
                            <a href="javascript:;">通过！</a>
                        </Popconfirm>
                    ):"已通过"
                )
            },
        }, {
            title: '操作',
            key: 'action',
            width:100,
            dataIndex: 'states',
            className:"article-table-col",
            render: (text, record) => {
                return(
                    record.states === 10 ?(
                        <Popconfirm title="确认？" onConfirm={() => this.toJinzhi(record.id)}>
                            <a href="javascript:;">禁止登陆！</a>
                        </Popconfirm>
                    ):<Popconfirm title="接触禁止？" onConfirm={() => this.toJiejin(record.id)}>
                        <a href="javascript:;">解禁！</a>
                    </Popconfirm>
                )
            },
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
        let activity = this.state.activitylsit.map(activity=>{
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
        let activity1 = this.state.activitylist.map(item=>{
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
                name:<Link to={`/app/detail/${item.article.id}`}> {item.article.title}</Link>,
                time:item.starttime+"—"+item.endtime,
                grade:deng,
                bao:item.registercont,
                states:shehe,
            }
        });
        const columns11 = [{
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
            dataIndex: 'states',
        },{
            title: '操作',
            key: 'action',
            width:100,
            className:"article-table-col",
            render: (text, record) => {
                if (record.states === '审核中...'){
                    return(
                        <Popconfirm title="审核通过？" onConfirm={() => this.toPostsShen(record.id)}>
                            <a href="javascript:;">审核通过！</a>
                        </Popconfirm>
                    )
                }else {
                    return "已审核"
                }
            },
        }];
        return(
            <div className="student">
                <Card title="请假信息" className={'person-item'} style={{ width: '100%' }}>
                    <Table pagination={false} bordered columns={columns} dataSource={this.state.data} size="small" />
                </Card>
                <Card title="学生参加活动情况" className={'person-item'} style={{ width: '100%' }}>
                    <Search
                        placeholder="搜索学号"
                        onSearch={this.onSerrch}
                        style={{ width: 200,marginBottom:"10px" }}
                    />
                    <Table pagination={false} bordered columns={columns1} dataSource={activity} size="small" />
                </Card>
                <Card title="账号管理" className={'person-item'} style={{ width: '100%' }}>
                    <Card title="社团账号" className={'person-item'} style={{ width: '100%' }}>
                        <Table pagination={false} bordered columns={shetuan} dataSource={shetuandata} size="small" />
                    </Card>
                    <Card title="教师账号" className={'person-item'} style={{ width: '100%' }}>
                        <Table expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>} pagination={false} bordered columns={teacher} dataSource={teacherdata} size="small" />
                    </Card>
                    <Card title="班主任" className={'person-item'} style={{ width: '100%' }}>
                        <Table expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>} pagination={false} bordered columns={ban} dataSource={bandata} size="small" />
                    </Card>
                </Card>
                <Card title="社团活动审核" className={'person-item'} style={{ width: '100%' }}>
                    <Table pagination={false} bordered columns={columns11} dataSource={activity1} size="small" />
                </Card>
            </div>

        )
    }
}
export default Yuanxi;