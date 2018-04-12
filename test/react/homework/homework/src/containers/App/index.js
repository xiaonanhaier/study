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