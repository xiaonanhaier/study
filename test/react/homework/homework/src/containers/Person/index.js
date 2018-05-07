import React,{ Component } from 'react';
import './person.css';
import { Card, Icon, Avatar, Table } from 'antd';
import { axiosapi as api} from "../../api/index";
import {Link} from 'react-router-dom';
import moment from 'moment';
const { Meta } = Card;
class Person extends Component{
    constructor(props){
        super(props);
        this.state={
            iflogin:false,
            classname:"",
            collegename:"",
            professionname:"",
            replylist:[],
            articlelist:[],
        };
    }
    componentDidMount(){
        let loginuser = JSON.parse(localStorage.userinfo);
        api.get(`adminuserinfo?userid=${this.props.match.params.id}`).then(user=>{
            if(user.data.code === 200){
                let iflogin = false;
                if(user.data.data[0].userid === loginuser.data[0].userid){
                    iflogin = true;
                }
                this.setState({...user.data.data[0],iflogin:iflogin});
            }

            //院系
            if(user.data.data[0].college !== 0 ){
                api.get(`organization?id=${this.state.college}`).then(college=>{
                    this.setState({collegename:college.data.data[0].name})
                })
            }
            //专业
            if(user.data.data[0].profession !== 0){
                api.get(`organization?id=${this.state.profession}`).then(profession=>{
                    this.setState({professionname:profession.data.data[0].name})
                })
            }
            //班级
            if(user.data.data[0].class !== 0){
                api.get(`organization?id=${this.state.class}`).then(clas=>{
                    this.setState({classname:clas.data.data[0].name})
                })
            }
        });

        //回复动态
        api.get(`reply/dong?userid=${this.props.match.params.id}`).then(reply=>{
            this.setState({replylist:reply.data.data});
        });
        //文章动态
        api.get(`posts/dong?userid=${this.props.match.params.id}`).then(posts=>{
            this.setState({articlelist:posts.data.data});
        });
    }
    render() {
        let edit = "";
        if (this.state.iflogin) {
            edit =  <Icon type="edit" />
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
            return <p>
                {moment.unix(item.createtime).format('YYYY-MM-DD h:mm:ss a')}&nbsp;&nbsp;&nbsp;
                回复了&nbsp;&nbsp;&nbsp;
                <Link to={`/app/detail/${item.article.id}`}>{item.article.title}</Link>
            </p>
        });
        let articlelist = this.state.articlelist.map(item=>{
            return <p>
                {moment.unix(item.create_time).format('YYYY-MM-DD h:mm:ss a')}&nbsp;&nbsp;&nbsp;
                发表了&nbsp;&nbsp;&nbsp;
                <Link to={`/app/detail/${item.title}`}>{item.id}</Link>
            </p>
        });
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
                            actions={[edit]}
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