import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';
import { bindActionCreators } from 'redux';
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
            user:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPass = this.checkPass.bind(this);
    }

    componentDidUpdate(){
        console.log(this.props.history);
        if(this.props.state.async.user.code === 200){
            this.setState({user:this.props.state.async.user})
            this.props.history.push("/app")
        }
    }

    componentWillUpdate(){
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.user);
            if (user.code === 200){
                this.setState({user:this.props.state.async.user})
                this.props.history.push("/app");
            }
        }

    }
    componentWillMount(){
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.user);
            if (user.code === 200){
                this.setState({user:this.props.state.async.user})
                this.props.history.push("/app");
            }
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            this.props.actions.login(values);
        });
    }

    userExists(rule, value, callback) {
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

    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form
        if (value) {
            validateFields(['rePasswd'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('username', {
            rules: [
                { required: true, min: 2, message: '用户名至少为 5 个字符' },
                { validator: this.userExists },
            ],
        });
        const passwdProps = getFieldProps('password', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkPass },
            ],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        let styles = {backgroundImage:`url(${bgimg})`}
        return (
            <div className="bg" style={styles}>
                <div className="fromdiv" >
                    <Form horizontal form={this.props.form}>
                        <FormItem
                            {...formItemLayout}
                            label="用户名"
                            hasFeedback
                            help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                        >
                            <Input {...nameProps} placeholder="学号" />
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

                        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleReset}>重置</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

Login = createForm()(Login);
Login.propTypes = {
    user:PropTypes.object,
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