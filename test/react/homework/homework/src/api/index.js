import axios from 'axios';
import React from 'react';
// import qs from 'qs'
import { Message ,Modal, Button ,notification } from 'antd';
let axiosIns = axios.create({});

// if (process.env.NODE_ENV == 'development') {
//     axiosIns.defaults.baseURL = '***';
// } else if (process.env.NODE_ENV == 'debug') {
//     axiosIns.defaults.baseURL = '***';
// } else if (process.env.NODE_ENV == 'production') {
//     axiosIns.defaults.baseURL = '***';
// }
axiosIns.defaults.baseURL = '/homeworkapi/api/web/index.php/v1';
axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.headers.post['Content-Type'] = 'application/json';
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
// axiosIns.defaults.headers.get['Authorization'] = "Bearer "+ JSON.parse(localStorage.user).data.access_token;

// axiosIns.defaults.responseType = 'json';
axiosIns.defaults.transformRequest = [function (data) {
    //数据序列化
    return JSON.stringify(data);
    // return data;
}
];
axiosIns.defaults.validateStatus = function (status) {
    return true;
};
let hide = {};
axiosIns.interceptors.request.use(function (config) {
    hide = Message.loading("中...",0);
    //配置config
    if(localStorage.getItem('user')){
        let user = JSON.parse(localStorage.user);
        if (user.code === 200){
            config.headers.Authorization = "Bearer "+ user.data.access_token;
        }
    }
    // config.headers.Accept = 'application/json';
    // config.headers.Content-Type = 'application/json';
    // config.headers.System = 'index';
    // let token = index.localStorage.get('token');
    // if(token){
    //     config.headers.Token = token;
    // }
        return config;
});
axiosIns.interceptors.response.use(function (response) {
    setTimeout(hide,500);
    // let data = response.data;
    let status = response.status;
    if (status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
});

let ajaxMethod = ['get', 'post','put','delete'];
let api = {};
ajaxMethod.forEach((method)=> {
    //数组取值的两种方式
    api[method] = function (uri, data, config) {
        return new Promise(function (resolve, reject) {
            axiosIns[method](uri, data, config).then((response)=> {
                /*根据后台数据进行处理
                 *1 code===200   正常数据+错误数据     code!==200   网络异常等
                 *2 code===200   正常数据     code!==200   错误数据+网络异常等
                 * 这里使用的是第一种方式
                 * ......
                 */
                resolve(response);

            }).catch((response)=> {
                if (response.data.code === 401) {
                    Modal.info({
                        title: '拒绝访问',
                        wrapClassName:"vertical-center-modal",
                        content: (
                            <div>
                                <p>1，未登录</p>
                                <p>2，没有权限</p>
                            </div>
                        ),
                        onOk() {
                            localStorage.removeItem('user');
                            window.location.reload()
                        },
                    });
                }
                if (response.data.code === 422) {
                    notification.error({
                        message: '用户名密码错误',
                        description: '无效的用户名或密码！'
                    })
                }
                reject(response);
                //alert('xiuxiu，限你10分钟到我面前来,不然...');
            })
        })
    }
});

export { api as axiosapi};