import * as api from '../api';
import {CREATE,DELETE,UPDATE,FETCH_ALL} from '../constants/actionTypes';
// create actions
const getPosts=()=>async(dispatch)=>{
    try {
        const {data}=await api.fetchPosts();
        console.log(data);
        const action={type:FETCH_ALL,payload:data};
        dispatch(action);

    } catch (error) {
        console.log(error.message);
    }
    
}

export const createPost=(post)=>async(dispatch)=>{
    try {
        const {data}=await api.createPosts(post);   //post api req to backend
        const action={type:CREATE,payload:data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost=(id,post)=>async(dispatch)=>{
    try {
        const {data}=await api.updatePost(id,post);
        const action={type:UPDATE,payload:data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost=(id)=>async(dispatch)=>{
    try {
        await api.deletePosts(id);
        dispatch({type:DELETE,payload:id});
    } catch (error) {
        console.log(error.message);
    }
}
export const likePost=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.likePost(id);
        const action={type:UPDATE,payload:data};
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}
export default getPosts; 