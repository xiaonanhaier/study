import React,{Component} from 'react';
import { Button, Form, Input } from 'antd';
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
        };
        //注册
        this.checkSignPass2 = this.checkSignPass2.bind(this);
        this.checkSignPass = this.checkSignPass.bind(this);
        this.handleSignSubmit = this.handleSignSubmit.bind(this);
        this.userSignExists = this.userSignExists.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    //注册
    handleSignSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
            this.props.onClick();
        });
    }

    userSignExists(rule, value, callback) {
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
                        <Input {...nameProps} placeholder="实时校验，输入 JasonWood 看看" />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                        hasFeedback
                    >
                        <Input {...emailProps} type="email" placeholder="onBlur 与 onChange 相结合" />
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
                        <Button type="primary" onClick={this.handleSignSubmit}>确定</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
SignUp = createForm()(SignUp);
export default SignUp;