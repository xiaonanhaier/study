import {
    LOGIN
} from '../constants/ActionTypes';
const initialState = {"code":0};

export default function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {"info":action.info};
        case "SIGNOUT":
            return {"code":0};
        default:
            return state;
    }
}