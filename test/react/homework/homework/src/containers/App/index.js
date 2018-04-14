import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import { BackTop } from 'antd';
import { HashRouter as Router, Route,Switch} from 'react-router-dom';

import {Header,Nav} from "../../components/index";
import {Shouye} from "../index";
import "./App.css"
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';
import { bindActionCreators } from 'redux';
import { axiosapi as api} from "../../api/index";
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:""
        }
    }

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

    componentDidMount(){
        this.setState({user:this.props.state.async.user})
    }
    render(){
        let imgListPath = `${this.props.match.path}/`;
        return(
            <div>
                <Header></Header>
                <Nav></Nav>

                <div className="content">
                    <Router>
                        <Switch>
                            <Route path={imgListPath} component={Shouye} />
                        </Switch>
                    </Router>
                </div>
                <BackTop />
                <div id="ft" className="cl">
                    <div className="wp" id="footer">
                        <div id="flk">
                            <div style={{float: 'left'}}>
                                <img src="https://static.bbs.miui.com/static/image/miui/base/footer_title.png"/>
                            </div>
                            <div style={{display: 'inline'}}>
                                <a href="http://www.miui.com/" target="_blank">MIUI官方网站</a>
                                <span className="pipe">|</span><a href="http://www.mi.com" target="_blank">小米旗下网站</a>
                                <span className="pipe">|</span><a href="http://jobs.miui.com/"  target="_blank">加入小米</a>
                                <span className="pipe">|</span><a href="a-69.html" target="_blank">免责声明</a>
                                <span className="pipe">|</span><a target="_blank" href="http://www.miui.com/res/doc/privacy/cn.html">隐私政策</a>
                                <span className="pipe">|</span><a href="http://www.miui.com/forum.php?mod=newindex&amp;mobile=yes">手机版</a>
                            </div>
                            <div style={{float: 'right',color: '#7e7e7e'}}>
                                Copyright © 2017 MIUI
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