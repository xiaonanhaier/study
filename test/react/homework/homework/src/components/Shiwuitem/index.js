import React,{Component} from 'react';
import './shiwuitem.css';
import { Card, Icon, Avatar, Modal } from 'antd';
const { Meta } = Card;
class Shiwuitem extends Component{
    constructor(props){
        super(props)
        this.showMessage = this.showMessage.bind(this);
    }
    showMessage(){
        Modal.info({
            title:'联系方式',
            content: <div>
                <p>{this.props.title}</p>
                <p>{this.props.tel}</p>
                <p>{this.props.introduction}</p>
            </div>

        })
    }
    render(){
        return(
            <div className="shiwuitem" >
                <Card
                    style={{ width: 200 }}
                    cover={<img style={{width:"100%",height:120}} alt="example" src={this.props.img} />}
                    actions={[ <Icon type="message"  onClick={this.showMessage}/>, <Icon type="ellipsis" />]}
                >
                    <Meta
                        title={this.props.time}
                        description={this.props.address}
                    />
                </Card>
            </div>
        )
    }
}
export default Shiwuitem;