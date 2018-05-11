import React,{Component} from 'react'
import './ban.css';
// import { axiosapi as api} from "../../../api/index";
// import {Link} from 'react-router-dom';
import { axiosapi as api} from "../../../api/index";
import { Table, Input, Button, Icon, Card,Popconfirm,message,Tree,Modal,Select } from 'antd';
import moment from 'moment';
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
class School extends Component{
    constructor(props){
        super(props)
        this.state={
            classs:[],
            activity:[],
            filterDropdownVisible: false,
            data:[],
            searchText: '',
            filtered: false,
            plate:[],
            visible: false,
            tovisible: false,
            smvisible: false,
            editvisible: false
        };
        this.onToexamine = this.onToexamine.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showaddtoModal = this.showaddtoModal.bind(this);
        this.handleaddtoOk = this.handleaddtoOk.bind(this);
        this.handleaddtoCancel = this.handleaddtoCancel.bind(this);
        this.showaddsmModal = this.showaddsmModal.bind(this);
        this.handleaddsmOk = this.handleaddsmOk.bind(this);
        this.handleaddsmCancel = this.handleaddsmCancel.bind(this);
        this.showeditModal = this.showeditModal.bind(this);
        this.handleeditOk = this.handleeditOk.bind(this);
        this.handleeditCancel = this.handleeditCancel.bind(this);
        this.handlePlateChange = this.handlePlateChange.bind(this);
        this.handleSmPlateChange = this.handleSmPlateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onjianChange = this.onjianChange.bind(this);
    }
    componentDidMount() {
        if (this.props.match.params.id !== ':id'){
            api.get('leave/school').then(leave=>{
                let data = leave.data.data.map(item=>{
                    let status = "审核中。。";
                    let mestatus = "审核中。。";
                    if (item.states === 1) {
                        status =  '通过';
                    }
                    if(item.three === 1) {
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
            })
            api.get('plate').then(plate=>{
                this.setState({plate:plate.data.data});
            })
        }
    }
    onToexamine(id){
        api.get(`/leave/toexamine?id=${id}`).then(res=>{
            if (res.data.code === 200) {
                message.success('成功！')
            }
        })
    }
    onSelect = (selectedKeys, info) => {
        this.setState({selidentidy:info.node.props.identidy,selid:selectedKeys})
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        let data = {
            title:this.state.editname,
            introduction:this.state.editjian
        };
        api.post('plate/create',data).then(res=>{
            if (res.data.code === 201){
                api.get('plate').then(plate=>{
                    this.setState({plate:plate.data.data});
                })
            }
        })
    };
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };
    showaddtoModal = () => {
        this.setState({
            tovisible: true,
        });
    };
    handleaddtoOk = (e) => {
        this.setState({
            tovisible: false,
        });
        let data = {
            title:this.state.editname,
            introduction:this.state.editjian,
            smplateid:this.state.addsmplate
        };
        api.post('topic/create',data).then(res=>{
            if (res.data.code === 201){
                api.get('plate').then(plate=>{
                    this.setState({plate:plate.data.data,tovisible: false});
                })
            }
        });
    };
    handleaddtoCancel = (e) => {
        this.setState({
            tovisible: false,
        });
    };
    showaddsmModal = () => {
        this.setState({
            smvisible: true,
        });
    };
    handleaddsmOk = (e) => {
        let data = {
            title:this.state.editname,
            introduction:this.state.editjian,
            parentid:this.state.addplate
        };
        api.post('smallplate/create',data).then(res=>{
            if (res.data.code === 201){
                api.get('plate').then(plate=>{
                    this.setState({plate:plate.data.data,smvisible: false,});
                })
            }
        });
    };
    handleaddsmCancel = (e) => {
        this.setState({
            smvisible: false,
        });
    };
    showeditModal = () => {
        this.setState({
            editvisible: true,
        });
    };
    handleeditOk = (e) => {
        this.setState({
            editvisible: false,
        });
    };
    handleeditCancel = (e) => {
        console.log(e);
        this.setState({
            editvisible: false,
        });
    };
    handlePlateChange(value) {
        this.setState({addplate:value});
    }
    handleSmPlateChange(value) {
        this.setState({addsmplate:value});
    }
    onNameChange(e){
        this.setState({editname:e.target.value});
    }
    onjianChange(e){
        this.setState({editjian:e.target.value});
    }
    render(){
        let platelist = this.state.plate.map(item=>{
           return   <Option key={item.id} value={item.id.toString()}>{item.title}</Option>
        });
        let smplatelist = this.state.plate.map(item=>{
           if (this.state.addplate === item.id.toString()){
               return item.smallPlate.map(sm=>{
                   return <Option key={sm.id} value={sm.id.toString()}>{sm.title}</Option>
               })
           }
        });
        let plate = this.state.plate.map(item=>{
            let small = item.smallPlate.map(sm=>{
                if (sm.topics !== null){
                    return (
                        <TreeNode identidy='small' title={sm.title} key={sm.id}>
                            {sm.topics.map(to=>{
                                return <TreeNode identidy='topic' title={to.title} key={to.id} />
                            })}
                        </TreeNode>
                    )
                }
            });
            return (
                <TreeNode identidy='plate' title={item.title} key={item.id}>
                    {small}
                </TreeNode>
            )
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
        return(
            <div className="student">
                <Card title="请假信息" className={'person-item'} style={{ width: '100%' }}>
                    <Table pagination={false} bordered columns={columns} dataSource={this.state.data} size="small" />
                </Card>
                <Card title="板块" className={'person-item'} style={{ width: '100%' }}>
                    <Tree
                        showLine
                        defaultExpandedKeys={['0-0']}
                        onSelect={this.onSelect}
                    >
                        <TreeNode title="分类信息" key="0-0">
                            {plate}
                        </TreeNode>
                    </Tree>
                    <div>
                        <Button onClick={this.showModal}>添加板块</Button>
                        <Button onClick={this.showaddsmModal}>添加副板块</Button>
                        <Button onClick={this.showaddtoModal}>添加主题板块</Button>
                        <Button onClick={this.showeditModal}>编辑</Button>
                    </div>
                </Card>
                <Modal
                    title="添加板块"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>板块名称：<Input onKeyUp={this.onNameChange}/></p>
                    <p>板块简介：<Input onKeyUp={this.onjianChange}/></p>
                </Modal>
                <Modal
                    title="添加副板块"
                    visible={this.state.smvisible}
                    onOk={this.handleaddsmOk}
                    onCancel={this.handleaddsmCancel}
                >
                    主版块：<Select style={{ width: 120 }} onChange={this.handlePlateChange}>
                    {platelist}
                    </Select>
                    <p>板块名称：<Input onKeyUp={this.onNameChange}/></p>
                    <p>板块简介：<Input onKeyUp={this.onjianChange}/></p>
                </Modal>
                <Modal
                    title="添加主题"
                    visible={this.state.tovisible}
                    onOk={this.handleaddtoOk}
                    onCancel={this.handleaddtoCancel}
                >
                    <div className={'item'}>
                        主版块：<Select defaultValue="" style={{ width: 120 }} onChange={this.handlePlateChange}>
                        {platelist}
                        </Select>
                    </div>
                    <div className={'item'}>
                        子版块：<Select defaultValue="" style={{ width: 120 }} onChange={this.handleSmPlateChange}>
                        {smplatelist}
                    </Select>
                    </div>
                    <p>主题名称：<Input onKeyUp={this.onNameChange}/></p>
                    <p>主题简介：<Input onKeyUp={this.onjianChange}/></p>
                </Modal>
                <Modal
                    title="编辑"
                    visible={this.state.editvisible}
                    onOk={this.handleeditOk}
                    onCancel={this.handleeditCancel}
                >
                    <p>名称：<Input onKeyUp={this.onNameChange}/></p>
                    <p>简介：<Input onKeyUp={this.onjianChange}/></p>
                </Modal>
            </div>
        )
    }
}
export default School;