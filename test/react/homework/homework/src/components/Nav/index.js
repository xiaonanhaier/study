import React,{Component} from 'react';
import "./nav.css";
import { Affix} from 'antd';
import {NavLink} from 'react-router-dom';

class Nav extends Component{
    render(){
        return(
            <Affix offsetTop = {0}>
            <div className="nav">
                <div className="navcon">
                    <ul className='navul'>
                        <NavLink to="/app/shouye"><li>首页</li></NavLink>
                        <NavLink to="/app/platelist/1"><li>校园新闻</li></NavLink>
                        <NavLink to="/login"><li>校园公告</li></NavLink>
                        <NavLink to="/login"><li>社团活动</li></NavLink>
                    </ul>
                </div>
            </div>
            </Affix>
        )
    }
}
export default Nav;