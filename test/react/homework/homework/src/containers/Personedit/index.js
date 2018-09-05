import React,{ Component } from 'react';
import './Personedit.css';
import {  Button, Col, Upload, Input,Card, Icon, Avatar, Table, Popconfirm,Form, message, Radio, Select } from 'antd';
import { axiosapi as api} from "../../api/index";
import { HashRouter as Router, Route,Switch,Link} from 'react-router-dom';
import moment from 'moment';
const { Meta } = Card;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class Personedit extends Component{
    constructor(props){
        super(props);
        this.state= {
            iflogin: false,
            classname: "",
            collegename: "",
            professionname: "",
            zhuanyelist:[],
            banjilist:[],
            sushelist:[],
            xueyuanlist:[],
            gongyulist:[],
            loading:false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleYuanXiSelectChange = this.handleYuanXiSelectChange.bind(this);
        this.handleGongYuSelectChange = this.handleGongYuSelectChange.bind(this);
        this.handleZhuanYeSelectChange = this.handleZhuanYeSelectChange.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlepwdSubmit = this.handlepwdSubmit.bind(this);
    };
    componentDidMount(){
        if (this.props.match.params.id !== ':id') {
            let loginuser = JSON.parse(localStorage.userinfo);
            api.get(`adminuserinfo?userid=${this.props.match.params.id}`).then(user => {
                if (user.data.code === 200) {
                    let iflogin = false;
                    if (user.data.data[0].userid === loginuser.data[0].userid) {
                        iflogin = true;
                    }
                    this.setState({...user.data.data[0], iflogin: iflogin});
                    this.setState({fileList:[{
                            uid: -1,
                            name: 'xxx.png',
                            status: 'done',
                            url: user.data.data[0].headpicurl,
                        }]});
                    api.get(`/organization?type=3&parentid=${user.data.data[0].college}`).then((res)=>{
                        this.setState({zhuanyelist:res.data.data});
                    });

                    api.get(`/organization?type=6&parentid=${user.data.data[0].apartment}`).then((res)=>{
                        this.setState({sushelist:res.data.data});
                    });

                    api.get(`/organization?type=4&parentid=${user.data.data[0].profession}`).then((res)=>{
                        this.setState({banjilist:res.data.data});
                    });
                    this.props.form.setFieldsValue({
                        nickname:this.state.nickname,
                        tel:this.state.tel,
                        yuanxi:this.state.college.toString(),
                        zhuanye:this.state.profession.toString(),
                        class:this.state.class.toString(),
                        gongyu:this.state.apartment.toString(),
                        sushe:this.state.dormitory.toString()
                    })
                }

                //院系初始化
                api.get('/organization?type=2').then((res)=>{
                    this.setState({xueyuanlist:res.data.data});
                });
                //公寓初始化
                api.get('/organization?type=7').then((res)=>{
                    this.setState({gongyulist:res.data.data});
                });
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let values = this.props.form.getFieldsValue();
        let data = {
            headpicurl:this.state.headpicurl,
            tel:values.tel,
            college:values.yuanxi,
            profession:values.zhuanye,
            class:values.class,
            apartment:values.gongyu,
            dormitory:values.sushe,
            organization:"",
        };
        api.post(`adminuserinfo/updateinfo`,data).then(res=>{
            if(res.data.code === 200){
                message.success('修改成功！')
            }else {
                message.error(res.data.code);
            }
        });
    }
    handlepwdSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    password:values.password
                };
                api.post(`adminuserinfo/changepwd?id=${this.props.match.params.id}`,data).then(res=>{
                    if (res.data.code === 200) {
                        message.success(res.data.data);
                    }
                });
            }
        });
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('必须上传照片');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('不能大于2M');
        }
        return isJPG && isLt2M;
    }
    handleYuanXiSelectChange(value) {
        api.get(`/organization?type=3&parentid=${value}`).then((res)=>{
            this.setState({zhuanyelist:res.data.data});
        });
    }
    handleGongYuSelectChange(value) {
        api.get(`/organization?type=6&parentid=${value}`).then((res)=>{
            this.setState({sushelist:res.data.data});
        });
    }
    handleZhuanYeSelectChange(value) {
        api.get(`/organization?type=4&parentid=${value}`).then((res)=>{
            this.setState({banjilist:res.data.data});
        });
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            let imgurl = "http://120.79.133.95/homeworkapi/api/web/"+info.file.response.data.url;
            this.setState({headpicurl:imgurl});
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
    render() {
        const { getFieldProps, getFieldDecorator } = this.props.form;
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.user);
            if (user.code === 200){
                var headers = "Bearer "+ JSON.parse(localStorage.user).data.access_token;
            }else {
                var headers = "";
            }
        }
        //院系
        let yuanxi = this.state.xueyuanlist.map(item=>{
            return(
                <Option key={item.id} value={item.id.toString()}>{item.name}</Option>
            )
        });
        //公寓
        let gongyu = this.state.gongyulist.map(item=>{
            return(
                <Option key={item.id} value={item.id.toString()}>{item.name}</Option>
            )
        });
        //专业
        let zhuanye = this.state.zhuanyelist.map(item=>{
            return(
                <Option key={item.id} value={item.id.toString()}>{item.name}</Option>
            )
        });
        //班级
        let banji = this.state.banjilist.map(item=>{
            return(
                <Option key={item.id} value={item.id.toString()}>{item.name}</Option>
            )
        });
        //宿舍
        let sushe = this.state.sushelist.map(item=>{
            return(
                <Option key={item.id} value={item.id.toString()}>{item.name}</Option>
            )
        });
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let sex = '男';
        if (this.state.sex === 0) {
            sex = "女"
        }
        const imageUrl = this.state.imageUrl;
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
                        >
                            <Meta
                                title={this.state.nickname}
                            />
                        </Card>
                        <Card
                            style={{ width: 250 }}
                            title="修改密码"
                        >
                            <Form onSubmit={this.handlepwdSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        确定
                                    </Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                    <div className="person-con-list">
                        <Card title="个人资料" className={'person-item'} style={{ width: '100%' }}>
                            <Form className="avatar-uploader" horizontal onSubmit={this.handleSubmit} >
                                <FormItem
                                    label="学号"
                                    required
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 10 }}
                                >
                                    <span className="ant-form-text">{this.state.studentid}</span>
                                </FormItem>

                                <FormItem
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 10 }}
                                    label="性别"
                                    required
                                >
                                    <span className="ant-form-text">{sex}</span>
                                </FormItem>

                                <FormItem
                                    label="昵称"
                                    required
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 10 }}
                                >
                                    <span className="ant-form-text">{this.state.nickname}</span>
                                </FormItem>

                                <FormItem
                                    label="电话"
                                    required
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 10 }}
                                >
                                    <Input value={this.state.tel} style={{ width: 200 }}
                                           {...getFieldProps('tel')}
                                    />
                                </FormItem>

                                <FormItem
                                    label="头像"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    // help="头像"
                                    required
                                >
                                    <img style={{width:"50px"}} src={this.state.headpicurl} alt=""/>
                                    <Upload
                                        name="Filedata"
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="/homeworkapi/api/web/index.php/v1/upload/upload"
                                        headers={{Authorization:headers}}
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                        className="personedit-img"
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
                                    </Upload>
                                </FormItem>

                                <FormItem
                                    label="院系"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    required
                                >
                                    {getFieldDecorator('yuanxi', {
                                        rules: [{ message: '请选择您的院系' }],
                                    })(
                                        <Select
                                            placeholder="选择一个院系"
                                            onChange={this.handleYuanXiSelectChange}
                                            style={{ width: 200 }}
                                        >
                                            {yuanxi}
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="专业"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    required
                                >
                                    {getFieldDecorator('zhuanye', {
                                        rules: [{ message: '请选择您的专业' }],
                                    })(
                                        <Select
                                            placeholder="选择一个专业"
                                            onChange={this.handleZhuanYeSelectChange}
                                            style={{ width: 200 }}
                                        >
                                            {zhuanye}
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="班级"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    required
                                >
                                    {getFieldDecorator('class', {
                                        rules: [{  message: '请选择您的班级' }],
                                    })(
                                        <Select
                                            placeholder="选择一个班级"
                                            style={{ width: 200 }}
                                        >
                                            {banji}
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="公寓"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    required
                                >
                                    {getFieldDecorator('gongyu', {
                                        rules: [{ message: '请选择您的公寓' }],
                                    })(
                                        <Select
                                            placeholder="选择一个公寓"
                                            onChange={this.handleGongYuSelectChange}
                                            style={{ width: 200 }}
                                        >
                                            {gongyu}
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    label="宿舍"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    required
                                >
                                    {getFieldDecorator('sushe', {
                                        rules: [{ message: '请选择您的宿舍' }],
                                    })(
                                        <Select
                                            placeholder="选择一个宿舍"
                                            style={{ width: 200 }}
                                        >
                                            {sushe}
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 24 }}>
                                    <Button type="primary" htmlType="submit">确定</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
Personedit = createForm()(Personedit);
export default Personedit;