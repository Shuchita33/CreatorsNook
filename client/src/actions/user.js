import * as api from '../api';
import { GETUSER,UPDATE_PROFILE,CREATE_PROFILE,FETCH_POSTS_BY_USER,START_LOADING, END_LOADING } from '../constants/actionTypes';
export const getProfile=(id)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data}=await api.viewProfile(id);
        console.log(data);
        dispatch({ type: GETUSER, payload: data });
        dispatch({type:END_LOADING})
        return data;
       
    } catch (error) {
        console.log(error);
    }
}
export const createProfile = (profileData) => async (dispatch) => {
    try {
        const { data } = await api.createProfile(profileData);
        console.log(data);
        dispatch({ type: CREATE_PROFILE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const updateProfile = (id, profileData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, profileData);
        console.log(data);
        dispatch({ type: UPDATE_PROFILE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
export const updateUserName = (id, name) => async (dispatch) => {
    try {
        const { data } = await api.updateUsername(id,name);
        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
};
export const getPostsByUser = (userId, username) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
        const { data } = await api.fetchPostsByUser(userId, username);
        dispatch({ type: FETCH_POSTS_BY_USER, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: END_LOADING });
    }
};