import React,{Component} from 'react';
import './pages.css';
import { Pagination } from 'antd';
class Pages extends Component{
    render(){
        return(
            <div className="pages">
                <Pagination onChange={this.props.onChange} defaultCurrent={1} total={50} />
            </div>
        )
    }
}
export default Pages