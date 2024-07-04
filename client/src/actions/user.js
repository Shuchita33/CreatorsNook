import * as api from '../api';
import { GETUSER,UPDATE_PROFILE,CREATE_PROFILE } from '../constants/actionTypes';
export const getProfile=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.viewProfile(id);
        console.log(data);
        dispatch({ type: GETUSER, payload: data });
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