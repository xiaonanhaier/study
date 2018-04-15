import React,{Component} from 'react';
import './detail.css';
import { Breadcrumb,Icon,Button } from 'antd';
import {Article} from '../../components';
class Detail extends Component{
    render(){
        return(
            <div className="detail">
                <div className="detail-baread">
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <Icon type="user" />
                            <span>Application List</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Application
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="detail-btn">
                    <Button type="primary" icon="edit">发布新帖</Button>
                    <Button type="primary" icon="message">回复</Button>
                </div>

                <div className="detail-con">
                    <Article/>
                    <Article/>
                </div>
            </div>
        )
    }
}
export default Detail