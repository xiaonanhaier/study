// import * as types from '../constants/ActionTypes';
import {ASYNC} from 'redux-amrc';
import { axiosapi as api} from "../api/index";
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
