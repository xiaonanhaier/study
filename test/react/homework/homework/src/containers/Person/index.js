import React,{ Component } from 'react';
import './person.css';
import { Card, Icon, Avatar, Table, Popconfirm } from 'antd';
import { axiosapi as api} from "../../api/index";
import { HashRouter as Router, Route,Switch,Link} from 'react-router-dom';
import moment from 'moment';
import { Student, Teacher, Ban, Shet,Qiandao,Gongyu, Yuanxi,School } from "../personlist";
import {message} from "antd/lib/index";
const { Meta } = Card;
class Person extends Component{
    constructor(props){
        super(props);
        this.state= {
            iflogin: false,
            classname: "",
            collegename: "",
            professionname: "",
            replylist: [],
            replylists: [],
            articlelists: [],
            articlelist: [],
            leave: [],
            lost: []
        };
        this.onFound = this.onFound.bind(this);
        this.onDeleteposts = this.onDeleteposts.bind(this);
        this.onDeletereply = this.onDeletereply.bind(this);
    };
    componentDidMount(){
        if (this.props.match.params.id !== ':id') {
            let loginuser = JSON.parse(localStorage.userinfo);
            let imgListPath = this.props.match.url;
            api.get(`adminuserinfo?userid=${this.props.match.params.id}`).then(user => {
                if (user.data.code === 200) {
                    let iflogin = false;
                    if (user.data.data[0].userid === loginuser.data[0].userid) {
                        iflogin = true;
                    }
                    this.setState({...user.data.data[0], iflogin: iflogin});
                }

                //院系
                if (user.data.data[0].college !== 0) {
                    api.get(`organization?id=${this.state.college}`).then(college => {
                        this.setState({collegename: college.data.data[0].name})
                    })
                }
                //专业
                if (user.data.data[0].profession !== 0) {
                    api.get(`organization?id=${this.state.profession}`).then(profession => {
                        this.setState({professionname: profession.data.data[0].name})
                    })
                }
                //班级
                if (user.data.data[0].class !== 0) {
                    api.get(`organization?id=${this.state.class}`).then(clas => {
                        this.setState({classname: clas.data.data[0].name})
                    })
                }

                //失物招领
                api.get(`lostfound?userid=${this.props.match.params.id}`).then(lost=>{
                    this.setState({lost:lost.data.data});
                });

                if (user.data.data[0].userid === loginuser.data[0].userid) {
                    if (user.data.data[0].identity === 1) {
                        this.props.history.push(`${imgListPath}/student/${this.props.match.params.id}`);
                    }
                    if (user.data.data[0].identity === 2) {
                        this.props.history.push(`${imgListPath}/gongyu/${this.props.match.params.id}`);
                    }
                    if (user.data.data[0].identity === 3) {
                        this.props.history.push(`${imgListPath}/shet/${this.props.match.params.id}`);
                    }
                    if (user.data.data[0].identity === 4) {
                        this.props.history.push(`${imgListPath}/teacher/${this.props.match.params.id}`);
                    }
                    if (user.data.data[0].identity === 5) {
                        this.props.history.push(`${imgListPath}/ban/${this.props.match.params.id}`);
                    }
                    if (user.data.data[0].identity === 6) {
                        this.props.history.push(`${imgListPath}/yuanxi/${this.props.match.params.id}`);
                    }
                    if (user.data.data[0].identity === 7) {
                        this.props.history.push(`${imgListPath}/school/${this.props.match.params.id}`);
                    }
                }
            });

            //回复动态
            api.get(`reply/dong?userid=${this.props.match.params.id}`).then(reply => {
                this.setState({replylist: reply.data.data});
            });
            //回复列表
            api.get(`reply/me`).then(reply => {
                let  data = reply.data.data.map(posts=>{
                    return {
                        id:posts.id,
                        name:<Link to={`/app/detail/${posts.article.id}`}> {posts.article.title}</Link>,
                        time:moment.unix(posts.createtime).format('YYYY-MM-DD h:mm:ss a')
                    };
                });
                this.setState({replylists: data});
            });
            //文章动态
            api.get(`posts/dong?userid=${this.props.match.params.id}`).then(posts => {
                this.setState({articlelist: posts.data.data});
            });
            //文章列表
            api.get(`posts/me`).then(posts => {
                let  data = posts.data.data.map(posts=>{
                    return {
                        id:posts.id,
                        dianji:posts.lookcont,
                        reply:posts.commentcont,
                        name:<Link to={`/app/detail/${posts.id}`}> {posts.title}</Link>,
                        time:moment.unix(posts.create_time).format('YYYY-MM-DD h:mm:ss a')
                    };
                });
                this.setState({articlelists: data});
            });
        }
    }
    onFound = (key) => {
        let lostdata = {
            states:1
        };
        api.put(`lostfound/update?id=${key}`,lostdata).then(lost=>{
            if (lost.data.code === 200) {
                message.success('OK!');
            }
        })

    };
    onDeleteposts(key) {
        let dele = {
            articleid:key
        };
        api.post(`reply/deletepost?id=${key}`,dele).then(res=>{
            api.delete(`posts/delete?id=${key}`).then(res=>{

            }).catch(res=>{
                const dataSource = [...this.state.articlelists];
                this.setState({ articlelists: dataSource.filter(item => item.id !== key) });
                message.success('删除成功！');
            });
        });
    }
    onDeletereply(key){
        api.delete(`reply/delete?id=${key}`).then(res=>{

        }).catch(res=>{
            const dataSource = [...this.state.replylists];
            this.setState({ replylists: dataSource.filter(item => item.id !== key) });
            message.success('删除成功！');
        });
    }
    render() {
        let edit = "";
        if (this.state.iflogin) {
            edit =  [<Link to={`/app/personedit/${this.props.match.params.id}`}><Icon type="edit" /></Link>]
        }
        let identity = "学生";
        switch (this.state.identity) {
            case 2:
                identity = "公寓";
                break;
            case 3:
                identity = "社团";
                break;
            case 4:
                identity = "教师";
                break;
            case 5:
                identity = "班主任";
                break;
            case 6:
                identity = "院系";
                break;
            case 7:
                identity = "学校";
                break;
        }
        const columns = [{
            title:"key",
            dataIndex: 'key',
        }, {
            title:"value",
            dataIndex: 'value',
        }, {
            title:"key",
            dataIndex: 'key2',
        }, {
            title:"value",
            dataIndex: 'value2',
        }];
        const columns1 = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"名称",
            dataIndex: 'name',
        }, {
            title:"时间",
            dataIndex: 'time',
        }, {
            title:"状态",
            dataIndex: 'status',
        }, {
            title: '操作',
            key: 'action',
            width:100,
            className:"article-table-col",
            render: (text, record) => {
                return (
                    record.status !== "已找到" && this.state.iflogin ?
                        (
                            <Popconfirm title="确认找到了？" onConfirm={() => this.onFound(record.id)}>
                                <a href="javascript:;">找到啦！</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];
        const columns2 = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"名称",
            dataIndex: 'name',
        }, {
            title:"时间",
            dataIndex: 'time',
        }, {
            title:"回复",
            dataIndex: 'reply',
        }, {
            title:"点击量",
            dataIndex: 'dianji',
        }, {
            title: '操作',
            key: 'action',
            width:100,
            className:"article-table-col",
            render: (text, record) => {
                return (
                      this.state.iflogin ?
                        (
                            <Popconfirm title="确认删除？" onConfirm={() => this.onDeleteposts(record.id)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];
        const columns3 = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"时间",
            dataIndex: 'time',
        }, {
            title:"回复了",
            dataIndex: 'name',
        }, {
            title: '操作',
            key: 'action',
            width:100,
            className:"article-table-col",
            render: (text, record) => {
                return (
                    this.state.iflogin ?
                        (
                            <Popconfirm title="确认删除？" onConfirm={() => this.onDeletereply(record.id)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];
        let leavedata = this.state.lost.map(item=>{
            let status = "未找到";
            if (item.states === 1){
                status = "已找到";
            }
            return {
                id:item.id,
                name:item.article.title,
                time:item.time,
                status:status
            }
        });
        const data = [{
            key: '院系',
            value: this.state.collegename,
            key2: '学号',
            value2: this.state.studentid,
        }, {
            key: '专业',
            value: this.state.professionname,
            key2: '官职',
            value2: identity,
        }, {
            key: '班级',
            value: this.state.classname,
            key2: '公寓',
            value2: this.state.apartment,
        }];
        let replylist = this.state.replylist.map(item=>{
            if (item.article !== null){
                return <p key={item.id}>
                    {moment.unix(item.createtime).format('YYYY-MM-DD h:mm:ss a')}&nbsp;&nbsp;&nbsp;
                    回复了&nbsp;&nbsp;&nbsp;
                    <Link to={`/app/detail/${item.article.id}`}>{item.article.title}</Link>
                </p>
            }
        });
        let articlelist = this.state.articlelist.map(item=>{
            return <p key={item.id}>
                {moment.unix(item.create_time).format('YYYY-MM-DD h:mm:ss a')}&nbsp;&nbsp;&nbsp;
                发表了&nbsp;&nbsp;&nbsp;
                <Link to={`/app/detail/${item.id}`}>{item.title}</Link>
            </p>
        });
        let imgListPath = this.props.match.url;
        return(
            <div className="person">
                <div className="person-title">
                    {this.state.nickname}的空间
                </div>
                <div className="person-con">
                    <div className="person-con-user">
                        <Card
                            style={{ width: 250 }}
                            cover={<img alt="example" src={this.state.headpicurl} />}
                            actions={edit}
                        >
                            <Meta
                                title={this.state.nickname}
                            />
                        </Card>
                    </div>
                    <div className="person-con-list">
                        <Card title="个人资料" className={'person-item'} style={{ width: '100%' }}>
                            <Table pagination={false} bordered columns={columns} dataSource={data} size="small" />
                        </Card>
                        <Card title="失物招领" className={'person-item'} style={{ width: '100%' }}>
                            <Table pagination={false} bordered columns={columns1} dataSource={leavedata} size="small" />
                        </Card>
                        <Card title="我的文章" className={'person-item'} style={{ width: '100%' }}>
                            <Table pagination={false} bordered columns={columns2} dataSource={this.state.articlelists} size="small" />
                        </Card>
                        <Card title="我的回复" className={'person-item'} style={{ width: '100%' }}>
                            <Table pagination={false} bordered columns={columns3} dataSource={this.state.replylists} size="small" />
                        </Card>
                        <Router>
                            <Switch>
                                <Route path={`${imgListPath}/student/:id`} component={Student} />
                                <Route path={`${imgListPath}/teacher/:id`} component={Teacher} />
                                <Route path={`${imgListPath}/ban/:id`} component={Ban} />
                                <Route path={`${imgListPath}/shet/:id`} component={Shet} />
                                <Route path={`${imgListPath}/qiandao/:id`} component={Qiandao} />
                                <Route path={`${imgListPath}/gongyu/:id`} component={Gongyu} />
                                <Route path={`${imgListPath}/yuanxi/:id`} component={Yuanxi} />
                                <Route path={`${imgListPath}/school/:id`} component={School} />
                            </Switch>
                        </Router>
                        <Card title="动态" className={'person-item'} style={{ width: '100%' }}>
                            {articlelist}
                            {replylist}
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default Person;