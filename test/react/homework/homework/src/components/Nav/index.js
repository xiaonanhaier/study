import React,{Component} from 'react';
import "./nav.css";
import {NavLink} from 'react-router-dom';

class Nav extends Component{
    render(){
        return(
            <div className="nav">
                <div className="navcon">
                    <ul className='navul'>
                        <NavLink to="/app"><li>首页</li></NavLink>
                        <NavLink to="/login"><li>新闻速递</li></NavLink>
                        <NavLink to="/login"><li>校园公告</li></NavLink>
                        <NavLink to="/login"><li>社团活动</li></NavLink>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Nav;