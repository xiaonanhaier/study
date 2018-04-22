import React,{Component} from 'react';
import './detail.css';
import {Breadcrumb,Icon,Button } from 'antd';
import {Link} from 'react-router-dom';
import {Article} from '../../components';
import {axiosapi as api} from "../../api";
import * as TodoActions from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            articleid:"",
            parentplate:"",
            parentplatename:"",
            smallplate:"",
            smallplatename:""
        }
    }
    componentWillMount(){
        let articleid = this.props.match.params.id;
        this.setState({articleid:articleid});
        api.get(`/posts/${articleid}`).then((res)=>{
            api.get(`/smallplate/${res.data.data.smplate}`).then((re)=>{
                this.setState({
                    parentplate:re.data.data.parent.id,
                    parentplatename:re.data.data.parent.title,
                    smallplate:re.data.data.id,
                    smallplatename:re.data.data.title,
                })
                this.props.actions.plateSelecct(re.data.data.id);
            })
        })
    }
    render(){
        return(
            <div className="detail">
                <div className="detail-baread">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={'/app'}><Icon type="home" /></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span>{this.state.parentplatename}</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.state.smallplatename}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="detail-btn">
                    <Link to={'/app/edit'}><Button type="primary" icon="edit">发布新帖</Button></Link>
                    <Button type="primary" icon="message">回复</Button>
                </div>

                <div className="detail-con">
                    <Article id={this.state.articleid}/>
                    <Article/>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);
// export default Detail