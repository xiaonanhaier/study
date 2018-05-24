import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './articlelable.css';
import {Icon} from 'antd';
import moment from 'moment';
class ArticleLable extends Component{
    render(){
        let img = this.props.data.titleimg === ""?"":<img src={this.props.data.titleimg} alt={this.props.data.title} title={this.props.data.title} width="627" alt="a"/>;
        return(
            <div className="articlelable">
                <h3>
                    <Link to={`/app/detail/${this.props.data.id}`}>{this.props.data.title}</Link>
                </h3>
                <Link to={`/app/detail/${this.props.data.id}`}>
                    {img}
                </Link>
                <p>
                    {this.props.data.introduction}
                </p>
                <div className="article_info clearfix">
                    <p className="article_info_left">
                        <Link to={`/app/person/${this.props.data.userinfo.userid}`}>
                            <img src={this.props.data.userinfo.headpicurl} alt={this.props.data.userinfo.nickname} />
                                <span className="author">{this.props.data.userinfo.nickname}</span>
                        </Link>
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