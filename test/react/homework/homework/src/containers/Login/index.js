import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';
import { bindActionCreators } from 'redux';
import {SignUp, UserInfo} from "../../components";
import bgimg from '../../common/images/69968.jpg';
import './login.css';
const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}
class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user:"",
            lognshow:"fromdiv",
            signuppass:"signup",
            signupuserinfo:"signup",
            userinfo:"",
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.checkLoginPass = this.checkLoginPass.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.signup = this.signup.bind(this);
        this.userLoginExists = this.userLoginExists.bind(this);
        this.signupinfo = this.signupinfo.bind(this);
    }

    componentDidUpdate(){
        // if(this.props.state.async.user.code === 200){
        //     this.setState({user:this.props.state.async.user})
        //     this.props.history.push("/app")
        // }
    }

    componentWillUpdate(){
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.user);
            if (user.code === 200){
                // console.log(user.data.id);
                if(user.data.id === undefined){
                    this.setState({user:this.props.state.async.user})
                    this.props.history.push("/app");
                }
            }
        }

    }
    componentWillMount(){
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.user);
            if (user.code === 200){
                this.setState({user:this.props.state.async.user})
                this.props.history.push("/app/shouye");
            }
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    signup() {
        this.setState({
            lognshow:"fromdiv ifshow",
            signuppass:"signup signupshow"
        })
    }
    signupinfo() {
        this.setState({
            signuppass:"signup ifshow",
            userinfo:<UserInfo history={this.props.history}/>,
            signupuserinfo:"signup signupshowinfo"
        })
    }
    handleLoginSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            this.props.actions.login(values);
        });
    }
    userLoginExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    }

    checkLoginPass(rule, value, callback) {
        const { validateFields } = this.props.form
        if (value) {
            validateFields(['rePasswd'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

        //登录
        const nameLloginProps = getFieldProps('username', {
            rules: [
                { required: true,message: '用户名' },
                { validator: this.userLoginExists },
            ],
        });
        const passwdLoginProps = getFieldProps('password', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkLoginPass },
            ],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        let styles = {backgroundImage:`url(${bgimg})`};
        return (
            <div className="bg" style={styles}>
                <div className={this.state.lognshow}>
                    <Form horizontal form={this.props.form}>
                        <FormItem
                            {...formItemLayout}
                            label="用户名"
                            hasFeedback
                            help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                        >
                            <Input {...nameLloginProps} placeholder="用户名" type="username" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                            hasFeedback
                        >
                            <Input {...passwdLoginProps} type="password" autoComplete="off"
                                   onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                            <Button type="primary" onClick={this.handleLoginSubmit}>登录</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleReset}>重置</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.signup}>注册</Button>
                        </FormItem>
                    </Form>
                </div>
                <div className={this.state.signuppass}>
                    <SignUp onClick={this.signupinfo}/>
                </div>
                <div className={this.state.signupuserinfo}>
                    {/*<UserInfo/>*/}
                    {this.state.userinfo}
                </div>
            </div>
        );
    }
}

Login = createForm()(Login);
Login.propTypes = {
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
)(Login);