import React, { Component } from 'react';
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';
import './header.css';
import logo from '../../common/images/logo.png';
import { Input } from 'antd';
const Search = Input.Search;
class Header extends Component {
    constructor(props){
        super(props);
        this.hasSignOut = this.hasSignOut.bind(this);
    }

    hasSignOut(){
        localStorage.removeItem("user");
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
                        <div className="headerlogin" onClick={signOut}>
                            <Link to='/login'>退出</Link>
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