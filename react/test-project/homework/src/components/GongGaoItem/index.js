import React,{Component} from 'react';
import './gonggaoitem.css';
import { Card  } from 'antd';
import {Link} from 'react-router-dom';
import {axiosapi as api} from "../../api";
class GongGaoItem extends Component{
    constructor(props) {
        super(props)
        this.state = {
            articlesmplatename:"",
            articletopicname:"",
        };
    }
    componentDidMount() {
        api.get(`/smallplate/${this.props.articlesmplateid}`).then((re)=>{
            this.setState({
                articlesmplatename:re.data.data.title,
            })
        });
        api.get(`/topic/${this.props.articletopicid}`).then((ress)=>{
            this.setState({
                articletopicname:ress.data.data.title,
            })
        })
    }
    render(){
        let img = this.props.articletitleimg === ""?"":<img src={this.props.articletitleimg} alt={this.props.articlename}/>;
        return(
            <div className="gonggaoitem">
                <Card title={this.state.articlesmplatename} extra={<Link to={`/app/detail/${this.props.articleid}`} style={{color: '#0068d3'}}>详情</Link>} style={{ width: "100%" }}>
                    <h3>{this.props.articlename}</h3>
                    {img}
                    <p style={{marginTop:'10px'}}>{this.props.articleintroduction}</p>
                </Card>
            </div>
        )
    }
}
export default GongGaoItem