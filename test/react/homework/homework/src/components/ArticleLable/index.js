import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './articlelable.css';
import {Icon} from 'antd';
import moment from 'moment';
class ArticleLable extends Component{
    render(){
        return(
            <div className="articlelable">
                <h3>
                    <a href="https://www.miui.com/thread-13733456-1-1.html?from=bbsindex">{this.props.data.title}</a>
                </h3>
                <a href="https://www.miui.com/thread-13733456-1-1.html?from=bbsindex">
                    <img src={this.props.data.titleimg} alt={this.props.data.title} title={this.props.data.title} width="627"/>
                </a>
                <p>
                    {this.props.data.introduction}
                </p>
                <div className="article_info clearfix">
                    <p className="article_info_left">
                        <a href="space-uid-1597041971.html">
                            <img src={this.props.data.userInfo.headpicurl} />
                                <span className="author">{this.props.data.userInfo.nickname}</span>
                        </a>
                        <span>发布于 {moment(this.props.data.create_time).format("YYYY-MM-DD HH:mm:ss")}</span>
                    </p>
                    <p className="article_info_right">
                        <span className="article_info_right_0"><Icon type="eye-o" /> {this.props.data.lookcont}</span>
                        <span className="article_info_right_1"><Icon type="message" />{this.props.data.commentcont}</span>
                    </p>
                </div>
            </div>
        )
    }
}
export default ArticleLable;