import * as api from '../api';
import {CREATE,DELETE,UPDATE,FETCH_ALL,FETCH_BY_SEARCH,START_LOADING,END_LOADING,FETCH_POST,COMMENT,DELETE_COMMENT} from '../constants/actionTypes';

// create actions
export const getPosts=(page)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data}=await api.fetchPosts(page);
        // console.log(data);
        
        const action={type:FETCH_ALL,payload:data};
        dispatch(action);
        // console.log("End")
        dispatch({type:END_LOADING})

    } catch (error) {
        console.log(error.message);
    }  
}

export const getPost=(id)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data}=await api.fetchPost(id);
        console.log(data);
        
        const action={type:FETCH_POST,payload:data};
        dispatch(action);
        dispatch({type:END_LOADING})

    } catch (error) {
        console.log(error.message);
    }  
}

export const createPost=(post)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data}=await api.createPosts(post);   //post api req to backend
        const action={type:CREATE,payload:data};
        dispatch(action);
        dispatch({type:START_LOADING});
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
export const getPostsBySearch=(searchQuery)=>async(dispatch)=>{
    try {
        // console.log(searchQuery);
        dispatch({type:START_LOADING});
        const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
        console.log(data);
        const action={type:FETCH_BY_SEARCH,payload:data};
        dispatch(action); 
        dispatch({type:END_LOADING})  
    } catch (error) {
        console.log(error);
    }
}
export const commentPost=(value,id)=>async(dispatch)=>{
    const {data} =await api.comment(value,id);
    //console.log(data); //new post with added comments
    console.log(data);
    dispatch({type:COMMENT,payload:data});
    
    return data.comments;
}
export const deleteCommentPost = (id, index) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(id, index);
        dispatch({ type: DELETE_COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};
export default getPosts; 