import React,{Component} from 'react';
import "./shouye.css";
import { Carousel } from 'antd';
import b123 from '../../common/images/123.jpg';
import b456 from '../../common/images/456.jpg';
import b789 from '../../common/images/789.jpg';
import {Editor} from "../../components/index";
class Shouye extends Component{
    render(){
        return(
            <div className="shouyecon">
                <div className="banner">
                    <Carousel autoplay>
                        <div><img src={b123} alt=""/></div>
                        <div><img src={b456} alt=""/></div>
                        <div><img src={b789} alt=""/></div>
                    </Carousel>
                </div>
                <div className="editor">
                    <Editor/>
                </div>
            </div>
        )
    }
}
export default Shouye;