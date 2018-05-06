import React,{ Component } from 'react';
import './index.css';
import { Editor } from "../../components";
import {Link} from 'react-router-dom';
import { Breadcrumb, Select,Table, Button, Icon, Input, Upload, message, DatePicker, Radio, InputNumber,Popconfirm } from 'antd';
import {axiosapi as api} from "../../api";
import moment from 'moment';
const Option = Select.Option;
const Dragger = Upload.Dragger;
const { TextArea } = Input;
const { RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';
class Editupdate extends Component{
    constructor(props){
        super(props);
        this.state={
            articleid:0,
            articletitle:"",
            topicid:1,
            topics:[],
            articletopicname:'',
            fileList:[],
            activitystart:"2018-05-05",
            activityend:"2018-05-05"
        };
        this.handleChange = this.handleChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onFiles1Change = this.onFiles1Change.bind(this);
        this.onIntroChange = this.onIntroChange.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.imglist = this.imglist.bind(this);
        this.submitTopic = this.submitTopic.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleOneChange = this.handleOneChange.bind(this);
        this.handleTwoChange = this.handleTwoChange.bind(this);
        this.handleThreeChange = this.handleThreeChange.bind(this);
        this.handleOthernumChange = this.handleOthernumChange.bind(this);
        this.onDateRandChange = this.onDateRandChange.bind(this);
    }
    componentDidMount() {
        let articleid = this.props.match.params.id;
        this.setState({articleid:articleid});
        //获取文章
        api.get(`/posts/${articleid}`).then((res)=>{
            if (res.data.data.plateid !== 4){
                this.setState({content:res.data.data.content.content,contentid:res.data.data.content.id})
            }
            this.setState({...res.data.data});

            api.get(`topic/${this.state.topicid}`).then(topic=>{
               this.setState({articletopicname:topic.data.data.title});
            });
            api.get(`/smallplate/${res.data.data.smplate}`).then((re)=>{
                this.setState({
                    parentplatename:re.data.data.parent.title,
                    smallplatename:re.data.data.title,
                    topics:re.data.data.topics,
                });
                //活动信息
                if (re.data.data.parent.id === 2){
                    api.get(`/clubactivity?articleid=${articleid}`).then(activiy=>{
                        this.setState({
                            activityid:activiy.data.data[0].id,
                            activitystart:activiy.data.data[0].starttime,
                            activityend:activiy.data.data[0].endtime,
                            activityone:activiy.data.data[0].firstprize,
                            activitytwo:activiy.data.data[0].secondaward,
                            activitythree:activiy.data.data[0].thirdaward,
                            activityothers:activiy.data.data[0].award,
                        });
                        api.get(`/personactivity/activity?activityid=${activiy.data.data[0].id}$userid=${this.props.state.async.userinfo.data[0].userid}`).then(baoming=>{
                            if(baoming.data.data >= 1){
                                this.setState({ifbaoming:true})
                            }
                        })
                    })

                }
                //丢失物品
                if (re.data.data.parent.id === 4){
                    api.get(`/lostfound?articleid=${articleid}`).then(lost=>{
                        this.setState({
                            lostid:lost.data.data[0].id,
                            losttime:lost.data.data[0].time,
                            lostaddress:lost.data.data[0].address,
                            losttel:lost.data.data[0].tel,
                        });
                    })

                }
            })
        });
        //获取文件列表
        api.get(`/file?articleid=${articleid}&usetype=file`).then(filelist=>{
            this.setState({fileList:filelist.data.data});
        });
    }
    handleChange(value) {
        this.setState({topicid:value});
        console.log(value);
    }
    onTitleChange(e){
        console.log(e.target.value);
        this.setState({title:e.target.value});
    }
    onFiles1Change(info){
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
            this.setState({titleimg:"http://120.79.133.95/homeworkapi/api/web/"+info.file.response.data.url});
        }
        if (status === 'done') {
            message.success(`${info.file.name} 成功上传.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    }
    onFilesChange(info){
        const status = info.file.status;
        if (status !== 'uploading') {
            let filedata = {
                filename:info.file.response.data.filename,
                randname:info.file.response.data.randName,
                url:info.file.response.data.url,
                type:info.file.response.data.type,
                usetype:"file",
                articleid:this.state.articleid,
            };
            api.post('file/create',filedata).then(fileres=>{
                if (fileres.data.code === 201) {
                    api.get(`/file?articleid=${this.state.articleid}&usetype=file`).then(filelist=>{
                        this.setState({fileList:filelist.data.data});
                    });
                }else {
                    message.error(fileres.data.code);
                }
            });
        }
        if (status === 'done') {
            message.success(`${info.file.name} 成功上传.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    }
    onIntroChange(e) {
        this.setState({introduction:e.target.value});
    }
    contentChange (value){
        this.setState({content:value});
    }
    imglist(value) {
        this.state.imglist.push(value)
    }
    submitTopic(){
        let updatedata = {
            topicid:this.state.topicid,
            title:this.state.title,
            titleimg:this.state.titleimg,
            introduction:this.state.introduction,
        };
        api.put(`posts/update?id=${this.state.id}`,updatedata).then(res=>{
            if (res.data.code === 200) {
                if(this.state.plateid !== 4){
                    if (typeof (this.state.content) !== "object") {
                        let contentdata = {
                            content:this.state.content
                        };
                        api.put(`postcontent/update?id=${this.state.contentid}`,contentdata).then(res=>{
                            if (res.data.code === 200 ) {
                                message.success('修改成功！')
                            }
                        })
                    }else {
                        message.success('修改成功！')
                    }
                }
            }
        });

    }
    onDelete = (key) => {
        api.delete(`file/delete?id=${key}`).then(res=>{

        }).catch(res=>{
            const dataSource = [...this.state.fileList];
            this.setState({ fileList: dataSource.filter(item => item.id !== key) });
            message.success('删除成功！');
        });
    };
    handleOneChange = (value) => {
        this.setState({activityone:value});
    };
    handleTwoChange = (value) => {
        this.setState({activitytwo:value});
    };
    handleThreeChange = (value) => {
        this.setState({activitythree:value});
    };
    handleOthernumChange = (value) => {
        this.setState({activityothers:value});
    };
    onDateRandChange(date, dateString) {
        this.setState({
            activitystart:dateString[0],
            activityend:dateString[1]
        });
    }
    onDayChange(date, dateString) {
        this.setState({losttime:dateString});
    }
    onAddressChange(e){
        this.setState({lostaddress:e.target.value});
    }
    onTelChange(e){
        this.setState({losttel:e.target.value});
    }
    render(){
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.user);
            if (user.code === 200){
                var headers = "Bearer "+ JSON.parse(localStorage.user).data.access_token;
            }else {
                var headers = "";
            }
        };
        const  tablecol = [{
                title: '文件列表',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="javascript:;">{text}</a>,
            }, {
                title: '',
                key: 'action',
                width:100,
                className:"article-table-col",
                render: (text, record) => {
                    return (
                        this.state.fileList.length >= 1 ?
                        (
                    <Popconfirm title="确认删除?" onConfirm={() => this.onDelete(record.key)}>
                    <a href="javascript:;">Delete</a>
                    </Popconfirm>
                    ) : null
                    );
                },
            }];
        let topics = this.state.topics.map(item=> {
            return <Option key={item.id}>{item.title}</Option>
        });
        const files = {
            name: 'Filedata',
            multiple: true,
            action: '/homeworkapi/api/web/index.php/v1/upload/upload',
            headers:{Authorization:headers},
            onChange:this.onFiles1Change,
        };
        const files2 = {
            name: 'Filedata',
            multiple: true,
            action: '/homeworkapi/api/web/index.php/v1/upload/upload',
            headers:{Authorization:headers},
            onChange:this.onFilesChange,
        };
        let table ="";
        if(this.state.fileList.length>0){
            let tabledata = this.state.fileList.map(item=>{
                return {
                    key:item.id,
                    name:item.filename,
                }
            });
            table =  <Table className={'article-table'}
                            pagination={false}
                            columns={tablecol}
                            dataSource={tabledata}
                            bordered
            />
        }
        let others = "";
        if(this.state.plateid !== 4){
            if(this.state.plateid === 2){
                others = <div>
                    <Editor contentinfo={this.state.content} content={this.contentChange} imglist={this.imglist}/>
                    <Dragger {...files2}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">附件</p>
                        <p className="ant-upload-hint">点击或拖拽上传</p>
                    </Dragger>
                    <div className='edit-item'>
                        时间：<RangePicker  value={[moment(this.state.activitystart, dateFormat), moment(this.state.activityend, dateFormat)]} onChange={this.onDateRandChange} />
                    </div>
                    <div className='edit-item'>
                        一等奖： <InputNumber value={this.state.activityone} min={1} max={30} onChange={this.handleOneChange} />
                    </div>
                    <div className='edit-item'>
                        二等奖： <InputNumber value={this.state.activitytwo} min={1} max={30} onChange={this.handleTwoChange} />
                    </div>
                    <div className='edit-item'>
                        三等奖： <InputNumber value={this.state.activitythree} min={1} max={30} onChange={this.handleThreeChange} />
                    </div>
                    <div className='edit-item'>
                        优秀奖： <InputNumber value={this.state.activityothers} min={0} max={30} onChange={this.handleOthernumChange} />
                    </div>

                </div>
            }else {
                others = <div>
                    <Editor contentinfo={this.state.content} content={this.contentChange} imglist={this.imglist}/>
                    <Dragger {...files2}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">附件</p>
                        <p className="ant-upload-hint">点击或拖拽上传</p>
                    </Dragger>
                </div>
            }

        }else {
            others = <div>
                <div className='edit-item'>
                    时间：<DatePicker value={moment(this.state.losttime, dateFormat)} onChange={this.onDayChange} />
                </div>
                <div className="edit-item">
                    <Input placeholder="地点" value={this.state.lostaddress} onChange={this.onAddressChange} />
                </div>
                <div className="edit-item">
                    <Input placeholder="联系方式" value={this.state.losttel} onChange={this.onTelChange} />
                </div>
            </div>
        }
        return(
            <div className="editupdate">
                <div className="detail-baread">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={'/app'}><Icon type="home" /></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span>{this.state.parentplatename}</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.state.smallplatename}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <ul className="tb_miui cl mbw">
                    <li className="a"><a href="javascript:;"
                    >发表帖子</a></li>
                </ul>
                <div className="editit">
                    <div className="editdropdown">
                        <Select
                            key={"1"}
                            showSearch
                            style={{ width: 200 }}
                            placeholder="选择主题"
                            optionFilterProp="children"
                            value={this.state.topicid.toString()}
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {topics}
                        </Select>
                        <Input value={this.state.title} className="inputbox"  onKeyUp={this.onTitleChange}/>
                    </div>
                    <div className="inputbox"></div>
                </div>
                <Dragger {...files}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">封面图</p>
                    <p className="ant-upload-hint">点击或拖拽上传</p>
                </Dragger>
                <TextArea value={this.state.introduction} style={{marginTop:'10px'}} onChange={this.onIntroChange} placeholder="简单介绍" autosize />
                {others}
                {table}
                <div className="edit-btn">
                    <Button type="primary" onClick={this.submitTopic}>保存</Button>
                </div>
            </div>
        )
    }
}
export default Editupdate