import React, { Component } from 'react';
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';
import './header.css';
import logo from '../../common/images/logo.png';
import { Input } from 'antd';
import {axiosapi as api} from "../../api";
const Search = Input.Search;
class Header extends Component {
    constructor(props){
        super(props);
        this.hasSignOut = this.hasSignOut.bind(this);
    }

    hasSignOut(){
        localStorage.removeItem("user");
    }

    componentWillMount() {
        let userinfo = JSON.parse(localStorage.userinfo);
        this.setState({...userinfo.data[0]})
    }

    render(){
        let {signOut} = this.props.actions;
        return(
            <div className="headerbg">
                <div className="headercontent">
                    <div className="headerlogo">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="headerinfo">
                        <div className="headerlogin" >
                            <Link to={`/app/person/${this.state.userid}`}>
                            <img className='headerimg' src={this.state.headpicurl} alt=""/>
                            {this.state.nickname}
                            </Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="tuichu" onClick={signOut}>
                                <Link to='/login'>退出</Link>
                            </span>
                        </div>
                        <div className="searchbar">
                            <Search
                                placeholder="搜索内容"
                                onSearch={value => console.log(value)}
                                style={{ width: 400 }}
                            />
                        </div>
                    </div>
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
)(Header);