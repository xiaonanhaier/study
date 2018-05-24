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
                        <NavLink to="/app/platelist/1"><li>学生新闻</li></NavLink>
                        <NavLink to="/app/gonggao"><li>学生公告</li></NavLink>
                        <NavLink to="/app/shetuan"><li>社团活动</li></NavLink>
                        <NavLink to="/app/shiwu"><li>失物招领</li></NavLink>
                        <NavLink to="/app/others"><li>附加功能</li></NavLink>
                    </ul>
                </div>
            </div>
            </Affix>
        )
    }
}
export default Nav;