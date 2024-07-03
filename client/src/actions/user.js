import * as api from '../api';

export const getProfile=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.viewProfile(id);
        console.log(data._id,data.name,data.email);
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = (id, profileData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, profileData);
        dispatch({ type: 'UPDATE_PROFILE', payload: data });
    } catch (error) {
        console.log(error);
    }
};