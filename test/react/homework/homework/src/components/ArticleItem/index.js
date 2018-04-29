import React,{Component} from 'react';
import './item.css';
import {axiosapi as api} from "../../api";
import {Link} from 'react-router-dom';
class ArticleItem extends Component{
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
        return(
            <div className="articleitem">
                <div className="avatarbox b_rad_8">
                    <a href="space-uid-1125852175.html">
                        <img className="b_rad_8"  src={this.props.articleuserimg}  onError="this.onerror=null;this.src='https://avatar.bbs.miui.com/images/noavatar_small.gif'"  width="40" height="40"/>
                    </a>
                </div>
                <div className="avatarbox-info">
                    <div className="sub-tit">
                        {/*<span className="icon">*/}
                            {/*<a href="thread-14096056-1-1.html" title="全局置顶主题 - 新窗口打开" target="_blank">*/}
                                {/*<img src="https://static.bbs.miui.com/static/image/miui/base/pin_3.gif"   alt="全站置顶"/>*/}
                            {/*</a>*/}
                        {/*</span>*/}
                        <a href="forum-464-1.html" target="_blank" className="thread_cate">{`[${this.state.articlesmplatename}]`}</a>
                        <Link to={`/app/detail/${this.props.articleid}`} style={{color: '#3C9D40'}}className="s xst">【{this.state.articletopicname}】{this.props.articlename}</Link>
                    </div>

                    <div className="sub-infos">
                        <a href="space-uid-1125852175.html" c="1" mid="card_9104">{this.props.articleusername}</a>
                        <span className="pipe">|</span>
                        浏览：<span className="number_d">{this.props.articlelookcont}</span>
                        <span className="pipe">|</span>
                        回复：<span className="number_d"><a href="thread-14096056-1-1.html" className="xi2">{this.props.articlecommentcont}</a></span>
                        <span className="pipe">|</span>
                        <a href="space-username-%25E5%25B0%258F%25E7%25B1%25B3%25E5%2593%2592%25EF%25BC%2581.html" c="1" mid="card_4872">小米哒！</a> <span></span>
                        <a href="forum.php?mod=redirect&amp;tid=14096056&amp;goto=lastpost#lastpost">
                            <span title="2018-4-29 09:45">1&nbsp;分钟前</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
export default ArticleItem;