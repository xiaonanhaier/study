import React,{Component} from "react";
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css';
import './editor.css';
class Editor extends Component{
    constructor(props){
        super(props);
        this.state = {
            htmlContent:""
        };
        this.handleHTMLChange = this.handleHTMLChange.bind(this);
        this.uploadFn = this.uploadFn.bind(this);
    }
    handleHTMLChange = (htmlContent) => {
        this.props.content(htmlContent);
        this.setState({ htmlContent })
    };
    uploadFn = (param) => {
        const serverURL = '/homeworkapi/api/web/index.php/v1/upload/upload';
        const xhr = new XMLHttpRequest;
        const fd = new FormData();
        // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
        const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            let responseMsg = JSON.parse(xhr.responseText);
            if(responseMsg.code === 200){
                let url = 'http://localhost/homeworkapi/api/web/'+responseMsg.data.url;
                this.props.imglist(responseMsg.data);
                param.success({
                    url: url,
                })
            }else {
                param.error({
                    msg: responseMsg.message
                })
            }

        };
        const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
        };
        const errorFn = (response) => {
            // 上传发生错误时调用param.error

            param.error({
                msg: 'unable to upload.'
            })
        };
        xhr.upload.addEventListener("progress", progressFn, false);
        xhr.addEventListener("load", successFn, false);
        xhr.addEventListener("error", errorFn, false);
        xhr.addEventListener("abort", errorFn, false);
        fd.append('Filedata', param.file);
        xhr.open('POST', serverURL, true);
        xhr.setRequestHeader('Authorization', "Bearer "+ JSON.parse(localStorage.user).data.access_token);
        xhr.send(fd)

    }
    render(){

        const editorProps = {
            placeholder: 'Hello you!',
            initialContent: '',
            collors:[
                '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
                '#61a951', '#16a085', '#07a9fe', '#003ba5', '#8e44ad', '#f32784',
                '#c0392b', '#d35400', '#f39c12', '#fdda00', '#7f8c8d', '#2c3e50'
            ],
            tabIndents: 2,
            contentFormat:"html",
            initialContent:this.props.contentinfo,
            onHTMLChange: this.handleHTMLChange,
            viewWrapper: '.edit',
            media:{
                allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
                image: true, // 开启图片插入功能
                video: false, // 开启视频插入功能
                audio: false, // 开启音频插入功能
                validateFn:null, // 指定本地校验函数，说明见下文
                uploadFn: this.uploadFn, // 指定上传函数，说明见下文
                removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
                onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
                onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
                onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
                externalMedias:{
                    image: false,
                    audio: false,
                    video: false
                }
            },
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