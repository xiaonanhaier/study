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
                return res.data
            }).catch((res)=>{
                return res.data
            })
        }
    }
}
