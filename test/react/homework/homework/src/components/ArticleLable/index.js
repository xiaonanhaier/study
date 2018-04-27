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
                    <Link to={`/app/detail/${this.props.data.id}`}>{this.props.data.title}</Link>
                </h3>
                <Link to={`/app/detail/${this.props.data.id}`}>
                    <img src={this.props.data.titleimg} alt={this.props.data.title} title={this.props.data.title} width="627" alt="a"/>
                </Link>
                <p>
                    {this.props.data.introduction}
                </p>
                <div className="article_info clearfix">
                    <p className="article_info_left">
                        <a href="space-uid-1597041971.html">
                            <img src={this.props.data.userinfo.headpicurl} alt={"aa"} />
                                <span className="author">{this.props.data.userinfo.nickname}</span>
                        </a>
                        <span>发布于 {moment(this.props.data.create_time*1000).format('YYYY-MM-DD HH:mm:ss')}</span>
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