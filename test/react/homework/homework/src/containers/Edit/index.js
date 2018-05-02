import React,{ Component } from 'react';
import './edit.css';
import { Editor } from "../../components";
import {Link} from 'react-router-dom';
import { Breadcrumb, Select, Button, Icon, Input, Upload, message, DatePicker, Radio} from 'antd';
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {axiosapi as api} from "../../api";
const Option = Select.Option;
const Dragger = Upload.Dragger;
const { TextArea } = Input;
const { RangePicker} = DatePicker;
class Edit extends Component{
    constructor(props){
        super(props);
        this.state={
          title:"",
          content:"",
            length:20,
            parentplate:"",
            parentplatename:"",
            smallplate:"",
            smallplatename:"",
            topics:[],
            zhuti:0,
            loading: false,
            visible: false,
            imglist:[],
            fileList:[],
            titleimg:""
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.submitTopic = this.submitTopic.bind(this);
        this.imglist = this.imglist.bind(this);
        this.onDateRandChange = this.onDateRandChange.bind(this);
        this.onDayChange = this.onDayChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.onFiles1Change = this.onFiles1Change.bind(this);
    }
    onTitleChange(e){
        this.setState({title:e.target.value,length:this.state.length-e.target.value.length});
    }
    componentWillMount() {
        //获取主题信息
        if(this.props.state.async.plate.plate === 0){
            this.props.history.push("/app");
        }
        api.get(`/smallplate/${this.props.state.async.plate}`).then((re)=>{
            this.setState({
                parentplate:re.data.data.parent.id,
                parentplatename:re.data.data.parent.title,
                smallplate:re.data.data.id,
                smallplatename:re.data.data.title,
                topics:re.data.data.topics,
            })
        })
    }
    onDayChange(date, dateString) {
        console.log(date, dateString);
    }
    onDateRandChange(date, dateString) {
        console.log(date, dateString);
    }
    onAddressChange(e){
        console.log(e.target.value);
    }
    submitTopic() {
        let data = {
          plateid:this.state.parentplate,
          title:this.state.title,
          smplate:this.state.smallplate,
          topicid:this.state.zhuti,
        };
        api.post('/posts/create',data).then((res)=>{
            let contentdata = {
                postsid:res.data.data.id,
                content:this.state.content
            };
            api.post('postcontent/create',contentdata).then(ress=>{
                console.log(ress);
            });
        })
        // console.log(data);
    }
    contentChange (value){
        this.setState({content:value});
    }
    handleChange(value) {
        this.setState({zhuti:value});
        console.log(value);
    }
    onFilesChange(info){
        const status = info.file.status;
        if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
            // let imgurl = "http://120.79.133.95/homeworkapi/api/web/"+info.file.response.data.url;
            // let imgurls = this.state.fileList;
            // imgurls.push(imgurl);
            this.setState({fileList:info.fileList});
        }
        if (status === 'done') {
            message.success(`${info.file.name} 成功上传.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
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
    imglist(value) {
        this.state.imglist.push(value)
    }
    handleBlur() {
        console.log('blur');
    }

    handleFocus() {
        console.log('focus');
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
        const files = {
            name: 'Filedata',
            multiple: true,
            action: '/homeworkapi/api/web/index.php/v1/upload/upload',
            headers:{Authorization:headers},
            onChange:this.onFiles1Change,
            // onChange(info) {
            //     const status = info.file.status;
            //     if (status !== 'uploading') {
            //         console.log(info.file, info.fileList);
            //
            //     }
            //     if (status === 'done') {
            //         message.success(`${info.file.name} 成功上传.`);
            //     } else if (status === 'error') {
            //         message.error(`${info.file.name} 上传失败`);
            //     }
            // },
        };
        const files2 = {
            name: 'Filedata',
            multiple: true,
            action: '/homeworkapi/api/web/index.php/v1/upload/upload',
            headers:{Authorization:headers},
            onChange:this.onFilesChange,
            // onChange(info) {
            //     const status = info.file.status;
            //     if (status !== 'uploading') {
            //         this.setState({fileList:info.fileList});
            //     }
            //     if (status === 'done') {
            //         message.success(`${info.file.name} 成功上传.`);
            //     } else if (status === 'error') {
            //         message.error(`${info.file.name} 上传失败`);
            //     }
            // },
        };
        let topics = this.state.topics.map(item=> <Option key={item.id}>{item.title}</Option>);
        return(
            <div className="editcon">
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
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {topics}
                        </Select>
                        <Input className="inputbox" onBlur={this.onTitleChange} onKeyUp={this.onTitleChange}/>
                        <lable>还能输入{this.state.length}个字符</lable>
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
                <TextArea style={{marginTop:'10px'}} placeholder="简单介绍" autosize />
                <Editor content={this.contentChange} imglist={this.imglist}/>
                <Dragger {...files2}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">附件</p>
                    <p className="ant-upload-hint">点击或拖拽上传</p>
                </Dragger>
                <div className='edit-item'>
                    时间：<RangePicker onChange={this.onDateRandChange} />
                </div>
                <div className='edit-item'>
                    时间：<DatePicker onChange={this.onDayChange} />
                </div>
                <div className="edit-item">
                    <Input placeholder="地点" onChange={this.onAddressChange} />
                </div>
                <div className="edit-btn">
                    <Button type="primary" onClick={this.submitTopic}>发表新帖</Button>
                    <Button type="primary">保存草稿</Button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);
// export default Edit