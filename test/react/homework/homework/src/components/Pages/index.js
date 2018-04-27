import React,{Component} from 'react';
import './pages.css';
import { Pagination } from 'antd';
class Pages extends Component{
    render(){
        return(
            <div className="pages">
                <Pagination onChange={this.props.onChange} defaultCurrent={1} current={this.props.page} pageSize={parseInt(this.props.pagesize)} total={parseInt(this.props.total)} />
            </div>
        )
    }
}
export default Pages