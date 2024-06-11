import * as api from '../api';

// create actions
const getPosts=()=>async(dispatch)=>{
    try {
        const {data}=await api.fetchPosts();
        console.log(data);
        const action={type:'FETCH_ALL',payload:data};
        dispatch(action);

    } catch (error) {
        console.log(error.message);
    }
    
}

export const createPost=(post)=>async(dispatch)=>{
    try {
        const {data}=await api.createPosts(post);   //post api req to backend
        const action={type:'CREATE',payload:data};
        dispatch(action);
    } catch (error) {
        
    }
}

export default getPosts; 