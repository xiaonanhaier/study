import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import { BackTop, Modal, Button, Cascader,} from 'antd';
import { HashRouter as Router, Route,Switch} from 'react-router-dom';
import {Header,Nav} from "../../components/index";
import {Shouye,Detail,Edit,PlateList,GongGao,SheTuan,ShiWu,Editupdate,Others,Person,Personedit} from "../index";
import {Qiandao,Jiang} from "../personlist";
import "./App.css"
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';
import { bindActionCreators } from 'redux';
import logo from '../../common/images/logo.png';
import { axiosapi as api} from "../../api/index";
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:"",
            platelist:[],
            smallplate:0,
        };
        this.handleOk = this.handleOk.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onNewChange = this.onNewChange.bind(this);
        this.displayRender = this.displayRender.bind(this);
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
        this.props.actions.newposts(false);
        this.props.actions.plateSelecct(this.state.smallplate);
        this.props.history.push('/app/edit');
        // setTimeout(() => {
        //     this.setState({ loading: false, visible: false });
        // }, 3000);
    };
    handleCancel = () => {
        this.props.actions.newposts(false);
        // this.setState({ visible: false });
    };
    componentWillMount(){
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.user);
            if (user.code !== 200){
                this.props.history.push("/login");
            }
        }else {
            this.props.history.push("/login");
        }
    }

    componentDidUpdate(){
        if(localStorage.getItem("user")){
            let user = JSON.parse(localStorage.user);
            if (user.code !== 200){
                this.props.history.push("/login");
            }
        }else {
            this.props.history.push("/login");
        }
    }

    componentDidMount(){
        this.props.actions.userinfo();
        this.setState({user:this.props.state.async.user})
        if(this.props.match.path === "/App"){
            this.props.history.push("/app/shouye");
        }
        api.get('/plate').then(res=>{
            let platelist =  res.data.data.map(item=>{
                let userinfo = JSON.parse(localStorage.userinfo);
                if(item.id === 2){
                    if (userinfo.data[0].identity !== 3) {
                        return {
                            value:item.id,
                            label:item.title,
                            disabled: true,
                            children:item.smallPlate.map(items=>{
                                return {
                                    value:items.id,
                                    label:items.title
                                }
                            })
                        }
                    }
                }
                if(item.id === 3 || item.id === 1){
                    if (userinfo.data[0].identity !== 6 && userinfo.data[0].identity !== 7) {
                        return {
                            value:item.id,
                            label:item.title,
                            disabled: true,
                            children:item.smallPlate.map(items=>{
                                return {
                                    value:items.id,
                                    label:items.title
                                }
                            })
                        }
                    }
                }
                return {
                    value:item.id,
                    label:item.title,
                    children:item.smallPlate.map(items=>{
                        return {
                            value:items.id,
                            label:items.title
                        }
                    })
                }
            });
            this.setState({platelist:platelist});
        });
    }

    onNewChange(value) {
        this.setState({smallplate:value[1]});
        // console.log(value);
    }

    displayRender(label) {
        return label[label.length - 1];
    }
    render(){
        let imgListPath = `${this.props.match.path}`;
        return(
            <div>
                <Header></Header>
                <Nav></Nav>

                <div className="content">
                    <Router>
                        <Switch>
                            <Route path={imgListPath+'/platelist/:id'} exact component={PlateList} />
                            <Route path={imgListPath+'/detail/:id'} component={Detail} />
                            <Route path={imgListPath+'/Edit'} exact component={Edit} />
                            <Route path={imgListPath+'/shouye'} component={Shouye} />
                            <Route path={imgListPath+'/shetuan'} component={SheTuan} />
                            <Route path={imgListPath+'/gonggao'} component={GongGao} />
                            <Route path={imgListPath+'/shiwu'} component={ShiWu} />
                            <Route path={imgListPath+'/editupdate/:id'} component={Editupdate} />
                            <Route path={imgListPath+'/others'} component={Others} />
                            <Route path={imgListPath+'/person/:id'} component={Person} />
                            <Route path={imgListPath+'/qiandao/:id'} component={Qiandao} />
                            <Route path={imgListPath+'/jiang/:id'} component={Jiang} />
                            <Route path={imgListPath+'/personedit/:id'} component={Personedit} />
                            <Route path={imgListPath+'/'} component={Shouye} />
                        </Switch>
                    </Router>
                </div>
                <BackTop />
                <Modal
                    visible={this.props.state.async.newposts}
                    title="网站导航"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            发表文章
                        </Button>,
                    ]}
                >
                    <Cascader
                        options={this.state.platelist}
                        expandTrigger="hover"
                        displayRender={this.displayRender}
                        onChange={this.onNewChange}
                    />
                </Modal>
                <div id="ft" className="cl">
                    <div className="wp" id="footer">
                        <div id="flk">
                            <div style={{float: 'left'}}>
                                <img style={{height:'25px'}} src={logo} alt=""/>
                            </div>
                            <div style={{display: 'inline'}}>
                                校园服务系统
                                <span className="pipe">|</span>校园服务
                                <span className="pipe">|</span>关注
                                <span className="pipe">|</span>免责声明
                            </div>
                            <div style={{float: 'right',color: '#7e7e7e'}}>
                                Copyright © 2017 School
                            </div>
                            {/*<div style={{paddingLeft: '28px',color: '#7e7e7e'}}>*/}
                                {/*京ICP备10046444号 | 京公网安备11010802020134号 | 京ICP证110507号*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

App.propTypes = {
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
)(App);