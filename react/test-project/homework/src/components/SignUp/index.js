import React,{Component} from 'react';
import { Button, Form, Input, message} from 'antd';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';
import { bindActionCreators } from 'redux';
import {PropTypes} from "prop-types";
import { axiosapi as api} from "../../api/index";
const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}
class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            iconLoading:false
        };
        //注册
        this.checkSignPass2 = this.checkSignPass2.bind(this);
        this.checkSignPass = this.checkSignPass.bind(this);
        this.handleSignSubmit = this.handleSignSubmit.bind(this);
        this.userSignExists = this.userSignExists.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.userSignemailExists = this.userSignemailExists.bind(this);
    }
    //注册
    handleSignSubmit(e) {
        e.preventDefault();
        this.setState({iconLoading:true});
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.error('出错啦。。。');
                return;
            }
            let data = {
                "username":values.name,
                "email":values.email,
                "password":values.rePasswd,
            };
            this.props.actions.SignUp(data);
        });
    }
    componentDidUpdate() {
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.user);
            if (user.code === 200){
                this.props.onClick();
            }
        }
    }
    userSignExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            api.get(`adminuser/userif?username=${value}`).then(res=>{
               if (res.data.data === 1) {
                   callback([new Error('抱歉，该用户名已被占用。')]);
               }else {
                   callback();
               }
            });
        }
    }
    userSignemailExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            api.get(`adminuser/userif?email=${value}`).then(res=>{
                if (res.data.data === 1) {
                    callback([new Error('抱歉，该邮箱已被占用。')]);
                }else {
                    callback();
                }
            });
        }
    }
    checkSignPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePasswd'], { force: true });
        }
        callback();
    }

    checkSignPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('passwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
        this.setState({iconLoading:false});
    }
    render(){
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, min: 5, message: '用户名至少为 5 个字符' },
                { validator: this.userSignExists },
            ],
        });
        const emailProps = getFieldProps('email', {
            validate: [{
                rules: [
                    { required: true },
                ],
                trigger: 'onBlur',
            }, {
                rules: [
                    { type: 'email', message: '请输入正确的邮箱地址' },
                    { validator: this.userSignemailExists }
                ],
                trigger: ['onBlur', 'onChange'],
            }],
        });
        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkSignPass },
            ],
        });
        const rePasswdProps = getFieldProps('rePasswd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkSignPass2,
            }],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return(
            <div className="signuppage">
                <Form horizontal form={this.props.form}>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                        hasFeedback
                        help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                    >
                        <Input {...nameProps} placeholder="用户名" />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                        hasFeedback
                    >
                        <Input {...emailProps} type="email" placeholder="邮箱" />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                    >
                        <Input {...passwdProps} type="password" autoComplete="off"
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback
                    >
                        <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                               onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                        />
                    </FormItem>

                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" onClick={this.handleSignSubmit} loading={this.state.iconLoading}>确定</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
SignUp = createForm()(SignUp);
SignUp.propTypes = {
    user: PropTypes.object,
    actions: PropTypes.object.isRequired,
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
)(SignUp);