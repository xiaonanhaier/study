import React,{ Component } from 'react';
import './edit.css';
import { Editor } from "../../components";
import {Link} from 'react-router-dom';
import { Breadcrumb, Select, Button, Icon, Input} from 'antd';
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {axiosapi as api} from "../../api";
const Option = Select.Option;
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
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.submitTopic = this.submitTopic.bind(this);
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
    submitTopic() {
        let data = {
          plateid:this.state.parentplate,
          title:this.state.title,
          smplate:this.state.smallplate,
          topicid:this.state.zhuti,
        };
        api.post('/posts/create',data).then((res)=>{
            console.log(res);
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

    handleBlur() {
        console.log('blur');
    }

    handleFocus() {
        console.log('focus');
    }
    render(){
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
                <Editor content={this.contentChange}/>
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