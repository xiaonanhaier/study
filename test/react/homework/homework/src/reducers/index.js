import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import user from './user';
//
// const rootReducer = combineReducers({
//     todos,
//     todel,
// });
const rootReducer = combineReducers({
    async: reducerCreator({
        user,
 })
});

export default rootReducer;
