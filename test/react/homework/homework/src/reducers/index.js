import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import user from './user';
import plate from './plate';
import newposts from './newposts';
const rootReducer = combineReducers({
    async: reducerCreator({
        user,
        plate,
        newposts,
 })
});

export default rootReducer;
