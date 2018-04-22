import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';
import user from './user';
import plate from './plate';
const rootReducer = combineReducers({
    async: reducerCreator({
        user,
        plate,
 })
});

export default rootReducer;
