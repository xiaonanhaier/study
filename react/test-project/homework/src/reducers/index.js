import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import user from './user';
import plate from './plate';
import newposts from './newposts';
import userinfo from './userinfo';
const rootReducer = combineReducers({
    async: reducerCreator({
        user,
        plate,
        newposts,
        userinfo,
 })
});

export default rootReducer;
