import * as api from '../api';

export const getProfile=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.viewProfile(id);
        console.log(data._id,data.name,data.email);
    } catch (error) {
        console.log(error);
    }
}