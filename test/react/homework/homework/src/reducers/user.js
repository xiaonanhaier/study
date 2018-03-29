import {
    LOGIN
} from '../constants/ActionTypes';
const initialState = {"code":0,"data":"","message":""};

export default function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {"info":action.info};
        default:
            return state;
    }
}