import { combineReducers } from "redux";
import reducer from './posts';
import authReducer from "./auth";

export default combineReducers({
    posts:reducer,
    auth:authReducer
})