import React,{Component} from 'react';
import {  Form, Select, InputNumber, DatePicker, TimePicker, Switch, Radio,
    Cascader, Slider, Button, Col, Upload, Icon, Input, message } from 'antd';
import { axiosapi as api} from "../../api/index";
import './userinfo.css';
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
// const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
// const areaData = [{
//     value: 'shanghai',
//     label: '上海',
//     children: [{
//         value: 'shanghaishi',
//         label: '上海市',
//         children: [{
//             value: 'pudongxinqu',
//             label: '浦东新区',
//         }],
//     }],
// }];

class UserInfo extends  Component{
    constructor (props) {
        super(props);
        this.state={
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            }],
            identity:"1",
            fileListshow:"fileList",
            zhuanyelist:[],
            banjilist:[],
            sushelist:[],
            xueyuanlist:[],
            gongyulist:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.normFile = this.normFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleYuanXiSelectChange = this.handleYuanXiSelectChange.bind(this);
        this.handleGongYuSelectChange = this.handleGongYuSelectChange.bind(this);
        this.handleZhuanYeSelectChange = this.handleZhuanYeSelectChange.bind(this);
    }
    componentDidMount() {
        //院系初始化
        api.get('/organization?type=2').then((res)=>{
            this.setState({xueyuanlist:res.data.data});
        });
        //公寓初始化
        api.get('/organization?type=7').then((res)=>{
            this.setState({gongyulist:res.data.data});
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        let values = this.props.form.getFieldsValue();
        let data = {
            sex:values.sex,
            nickname:values.nickname,
            headpicurl:"http://120.79.133.95/homeworkapi/api/web/"+values.upload[0].response.data.url,
            studentid:values.student,
            tel:values.tel,
            identity:values.idendity,
            college:values.yuanxi,
            profession:values.zhuanye,
            class:values.class,
            apartment:values.gongyu,
            dormitory:values.sushe,
            organization:"",
        };
        let filedata = {
            filename:values.upload[0].response.data.filename,
            randname:values.upload[0].response.data.randName,
            url:values.upload[0].response.data.url,
            type:values.upload[0].response.data.type,
            usetype:"usertitle"
        }
        api.post(`/adminuserinfo/create`,data).then(res=>{
            if(res.data.code === 201){
                if(this.state.identity === "5"){
                    let teacherdata = {
                        class:values.banclass,
                        type:2
                    };
                    api.post(`/teacher/create`,teacherdata).then(ress=>{
                        if (ress.data.code === 201) {
                            api.post('file/create',filedata).then(fileres=>{
                                if (fileres.data.code === 201) {
                                    this.props.history.push("/app");
                                }else {
                                    message.error(fileres.data.code);
                                }
                            });
                        }else {
                            message.error(ress.data.code);
                        }
                    })
                }else {
                    api.post('file/create',filedata).then(fileres=>{
                        if (fileres.data.code === 201) {
                            this.props.history.push("/app");
                        }else {
                            message.error(fileres.data.code);
                        }
                    });
                }
            }else {
                message.error(res.data.code);
            }
        });
        // if(this.state.identity === "5"){
        //     let teacherdata = {
        //         class:values.banclass,
        //         type:2
        //     };
        //     api.post(`/teacher/create`,teacherdata).then(res=>{
        //         console.log(res);
        //     })
        // }

        // console.log(data);
        // console.log('收到表单值：', this.props.form.getFieldsValue());
    }

    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    handleSelectChange(value) {
        this.setState({identity:value});
        if(value === "1"){
            // this.setState({identity:value,fileListshow:"fileList"});
        }else {
            // this.setState({identity:value,fileListshow:"fileList fileListshow"});
        }
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
    handleUpload(info) {
        let fileList = info.fileList;

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList = fileList.slice(-2);

        // 2. 读取远程路径并显示链接
        fileList = fileList.map((file) => {
            if (file.response) {
                // 组件会将 file.url 作为链接进行展示
                file.url = file.response.url;
            }
            return file;
        });

        // 3. 按照服务器返回信息筛选成功上传的文件
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });

        this.setState({ fileList });
    }
    render(){
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
        //班级
        let sushe = this.state.sushelist.map(item=>{
            return(
                <Option key={item.id} value={item.id.toString()}>{item.name}</Option>
            )
        });
        //itemlist
        let itemlist = [];
        if (this.state.identity === "1") {
            itemlist = <div className={this.state.fileListshow}>
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
            </div>
        }else if(this.state.identity === "4" || this.state.identity === "6" || this.state.identity === "3" ) {
            itemlist = <div className={this.state.fileListshow}>
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
            </div>
        }else if(this.state.identity === "5") {
            itemlist = <div className={this.state.fileListshow}>
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
                label="所带班级"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                >
                {/*<p className="ant-form-text" id="static" name="static">唧唧复唧唧木兰当户织呀</p>*/}
                {/*<p className="ant-form-text">*/}
                {/*<a href="#">链接文字</a>*/}
                {/*</p>*/}
                </FormItem>
                <FormItem
                    label="专业"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    required
                >
                    {getFieldDecorator('banzhuanye', {
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
                    {getFieldDecorator('banclass', {
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
            </div>
        }else {
            itemlist = "";
        }
        return(
            <div className="userinfo">
                <Form horizontal onSubmit={this.handleSubmit} >
                    <FormItem
                        label="身份"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        required
                    >
                        {getFieldDecorator('idendity', {
                            rules: [{ required: true, message: '请选择您的身份' }],
                        })(
                            <Select
                                placeholder="选择一个身份"
                                onChange={this.handleSelectChange}
                                style={{ width: 200 }}
                            >
                                <Option value="1">学生</Option>
                                <Option value="2">公寓</Option>
                                <Option value="3">社团</Option>
                                <Option value="4">教师</Option>
                                <Option value="5">班主任</Option>
                                <Option value="6">院系</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="学号"
                        required
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                    >
                        <Input style={{ width: 200 }}
                                     {...getFieldProps('student')}
                        />
                        {/*<span className="ant-form-text"> 台机器</span>*/}
                    </FormItem>

                    <FormItem
                        label="昵称"
                        required
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                    >
                        <Input style={{ width: 200 }}
                               {...getFieldProps('nickname')}
                        />
                        {/*<span className="ant-form-text"> 台机器</span>*/}
                    </FormItem>

                    <FormItem
                        label="电话"
                        required
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                    >
                        <Input style={{ width: 200 }}
                               {...getFieldProps('tel')}
                        />
                        {/*<span className="ant-form-text"> 台机器</span>*/}
                    </FormItem>
                    {/*<FormItem*/}
                        {/*label="我是标题"*/}
                        {/*labelCol={{ span: 8 }}*/}
                        {/*wrapperCol={{ span: 10 }}*/}
                    {/*>*/}
                        {/*<p className="ant-form-text" id="static" name="static">唧唧复唧唧木兰当户织呀</p>*/}
                        {/*<p className="ant-form-text">*/}
                            {/*<a href="#">链接文字</a>*/}
                        {/*</p>*/}
                    {/*</FormItem>*/}

                    <FormItem
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 10 }}
                        label="性别"
                        required
                    >
                        {getFieldDecorator('sex')(
                            <RadioGroup>
                                <Radio value="1">男</Radio>
                                <Radio value="0">女</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>

                    <FormItem
                        label="头像"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        // help="头像"
                        required
                    >
                        <Upload name="Filedata"
                                action="/homeworkapi/api/web/index.php/v1/upload/upload"
                                listType="picture" onChange={this.handleUpload}
                                headers={{Authorization:headers}}
                                {...getFieldProps('upload', {
                                    valuePropName: 'fileList',
                                    normalize: this.normFile,
                                })}
                        >
                            <Button type="ghost">
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    </FormItem>

                    {itemlist}

                    {/*<FormItem*/}
                        {/*label="级联选择"*/}
                        {/*labelCol={{ span: 8 }}*/}
                        {/*wrapperCol={{ span: 16 }}*/}
                        {/*required*/}
                        {/*hasFeedback*/}
                    {/*>*/}
                        {/*<Cascader style={{ width: 200 }} options={areaData} {...getFieldProps('area')} />*/}
                    {/*</FormItem>*/}

                    {/*<FormItem*/}
                        {/*label="DatePicker 日期选择框"*/}
                        {/*labelCol={{ span: 8 }}*/}
                        {/*required*/}
                    {/*>*/}
                        {/*<Col span="6">*/}
                            {/*<FormItem>*/}
                                {/*<DatePicker {...getFieldProps('startDate')} />*/}
                            {/*</FormItem>*/}
                        {/*</Col>*/}
                        {/*<Col span="1">*/}
                            {/*<p className="ant-form-split">-</p>*/}
                        {/*</Col>*/}
                        {/*<Col span="6">*/}
                            {/*<FormItem>*/}
                                {/*<DatePicker {...getFieldProps('endDate')} />*/}
                            {/*</FormItem>*/}
                        {/*</Col>*/}
                    {/*</FormItem>*/}


                    {/*<FormItem*/}
                        {/*label="TimePicker 时间选择器"*/}
                        {/*labelCol={{ span: 8 }}*/}
                        {/*wrapperCol={{ span: 16 }}*/}
                        {/*required*/}
                    {/*>*/}
                        {/*<TimePicker {...getFieldProps('time')} />*/}
                    {/*</FormItem>*/}

                    {/*<FormItem*/}
                        {/*label="选项"*/}
                        {/*labelCol={{ span: 8 }}*/}
                    {/*>*/}
                        {/*<RadioGroup {...getFieldProps('rg')}>*/}
                            {/*<RadioButton value="a">选项一</RadioButton>*/}
                            {/*<RadioButton value="b">选项二</RadioButton>*/}
                            {/*<RadioButton value="c">选项三</RadioButton>*/}
                        {/*</RadioGroup>*/}
                    {/*</FormItem>*/}



                    <FormItem wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
UserInfo = createForm()(UserInfo);
export default UserInfo;