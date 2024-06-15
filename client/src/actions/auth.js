import * as api from '../api';
import {AUTH} from '../constants/actionTypes';
// to fetch signup data from backend or send the data to the backend from the user
// first create backend endpoints to 

export const signin=(formData,navigate)=>async(dispatch)=>{
    try {
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}
export const signup=(formData,navigate)=>async(dispatch)=>{
    try {
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}