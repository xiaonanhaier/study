import React,{Component} from 'react'
import './perteacher.css';
import { axiosapi as api} from "../../../api/index";
import {Link} from 'react-router-dom';
import { Table, Input, Button, Icon, Card, Popconfirm,Modal,message,Select } from 'antd';
const Option = Select.Option;
class Gongyu extends Component{
    constructor(props){
        super(props)
        this.state={
            classs:[],
            activity:[],
            filterDropdownVisible: false,
            data:[],
            searchText: '',
            filtered: false,
            visible:false,
            xueyuanlist:[],
            zhuanyelist:[],
            banjilist:[]
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    componentDidMount() {
        if (this.props.match.params.id !== ':id'){
            //院系初始化
            api.get('/organization?type=2').then((res)=>{
                this.setState({xueyuanlist:res.data.data});
            });
            api.get(`teacher?userid=${this.props.match.params.id}&type=1`).then(classs=>{
                let classlist = classs.data.data.map(item=>{
                    return {
                        text:item.organ.parent.name+item.organ.name,
                        value:item.organ.parent.name+item.organ.name
                    }
                });
                let classes = classs.data.data.map(item=>{
                   return {
                       id:item.id,
                       class:item.organ.parent.name+item.organ.name
                   }
                });
                this.setState({classs:classlist,classes:classes});
            });
            api.get('leave/gongyu').then(leave=>{
                let data = leave.data.data.map(item=>{
                   return {
                       key:item.id,
                       student:item.userinfo.studentid,
                       classs:item.ban.organ.parent.name+item.ban.organ.name,
                       teacher:item.ban.userinfo.nickname,
                       teachertel:item.ban.userinfo.tel,
                       sushe:item.sushe.name,
                   }
                });
                this.setState({data:data});
            })
        }
    }
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    };
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.state.data.map((record) => {
                const match = record.student.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    student: (
                        <span>
              {record.student.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };
    render(){
        const columns = [{
            title: '学号',
            dataIndex: 'student',
            key: 'student',
            filterDropdown: (
                <div className="custom-filter-dropdown inputclass">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search studentid"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput && this.searchInput.focus());
            },
        }, {
            title: '专业班级',
            dataIndex: 'classs',
            key: 'classs',
            filters: this.state.classs,
            onFilter: (value, record) => record.classs.indexOf(value) === 0,
        },{
            title: '宿舍',
            dataIndex: 'sushe',
            key: 'sushe',
        },{
            title: '班主任',
            dataIndex: 'teacher',
            key: 'teacher',
        },{
            title: '班主任联系方式',
            dataIndex: 'teachertel',
            key: 'teachertel',
        }];
        const columns1 = [{
            title:"ID",
            dataIndex: 'id',
        }, {
            title:"专业班级",
            dataIndex: 'class',
        }, {
            title: '操作',
            key: 'action',
            width:100,
            className:"article-table-col",
            render: (text, record) => {
                return (
                        <Popconfirm title="确认删除？" onConfirm={() => this.onDelete(record.id)}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                );
            },
        }];
        return(
            <div className="student">
                <Card title="请假信息" className={'person-item'} style={{ width: '100%' }}>
                    <Table pagination={false} columns={columns} dataSource={this.state.data} />
                </Card>
            </div>

        )
    }
}
export default Gongyu;