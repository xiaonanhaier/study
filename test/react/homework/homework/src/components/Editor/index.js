import React,{Component} from "react";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css';
import './editor.css';
class Editor extends Component{
    constructor(props){
        super(props)
        this.state = {
            htmlContent:""
        }
        this.handleHTMLChange = this.handleHTMLChange.bind(this);
    }
    handleHTMLChange = (htmlContent) => {
        this.setState({ htmlContent })
    }
    render(){
        const editorProps = {
            placeholder: 'Hello you!',
            initialContent: '',
            onHTMLChange: this.handleHTMLChange,
            viewWrapper: '.edit',
            // 增加自定义预览按钮
            extendControls: [
                {
                    type: 'split',
                },
                {
                    type: 'button',
                    text: '预览',
                    className: 'preview-button',
                    onClick: () => {
                        window.open().document.write(this.state.htmlContent)
                    }
                }
            ]
        }
        return(
            <div className="edit">
                <BraftEditor {...editorProps} />
            </div>
        )
    }
}
export default Editor;