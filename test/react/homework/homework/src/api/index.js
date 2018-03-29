import axios from 'axios'
// import qs from 'qs'
import { Message } from 'antd';
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
    hide = Message.loading("加载中...",0);
    //配置config
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
    setTimeout(hide,2000);
    // let data = response.data;
    let status = response.status;
    if (status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
});

let ajaxMethod = ['get', 'post'];
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
                // if (response.data.StatusCode) {
                //     //toast封装：  参考ele-mint-ui
                //     Toast({
                //         message: response.data.Message,
                //         position: 'top',
                //         duration: 2000
                //     });
                //     if (response.data.Message === '未登录') {
                //         Toast({
                //             message: response.data.Message,
                //             position: '',
                //             duration: 2000
                //         });
                //     }
                // } else {
                //     resolve(response);
                // }
            }).catch((response)=> {
                reject(response);
                //alert('xiuxiu，限你10分钟到我面前来,不然...');
            })
        })
    }
});

export { api as axiosapi};