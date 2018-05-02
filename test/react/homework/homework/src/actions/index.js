// import * as types from '../constants/ActionTypes';
import {ASYNC} from 'redux-amrc';
import { axiosapi as api} from "../api/index";
import { message } from 'antd';
export function loginauth(info) {
    return {type:"LOGIN",info}
}
export function login(data) {
    return {
        [ASYNC]:{
            key:'user',
            promise:()=>api.post('adminuser/login',data,
            ).then((res)=>{
                localStorage.setItem("user",JSON.stringify(res.data));
                return res.data;
            }).catch((res)=>{
                return res.data;
            })
        }
    }
}

export function SignUp(data) {
    return {
        [ASYNC]:{
            key:'user',
            promise:()=>api.post('adminuser/signup',data,
            ).then((res)=>{
                if(res.data.code === 200){
                    localStorage.setItem("user",JSON.stringify(res.data));
                    return res.data;
                }else {
                    message.error(res.data.code);
                }
            }).catch((res)=>{
                message.error(res.data.code);
            })
        }
    }
}

export function signOut() {
    localStorage.removeItem("user");
    return {type:"SIGNOUT"}
}

export function plateSelecct(data) {
    return {
        [ASYNC]:{
            key:'plate',
            promise:()=>Promise.resolve(data)
        }
    }
}
export function newposts(data) {
    return {
        [ASYNC]:{
            key:'newposts',
            promise:()=>Promise.resolve(data)
        }
    }
}
export function userinfo() {
    return {
        [ASYNC]:{
            key:'userinfo',
            promise:()=>api.get('adminuserinfo').then((res)=>{
                if(res.data.code === 200){
                    localStorage.setItem("userinfo",JSON.stringify(res.data));
                    return res.data;
                }else {
                    message.error(res.data.code);
                }
            }).catch((res)=>{
                message.error(res.data.code);
            })
        }
    }
}