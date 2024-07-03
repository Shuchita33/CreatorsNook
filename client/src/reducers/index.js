import { combineReducers } from "redux";
import reducer from './posts';
import authReducer from "./auth";
import userReducer from "./user";

export default combineReducers({
    posts:reducer,
    auth:authReducer,
    user:userReducer
})