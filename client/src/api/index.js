import axios from 'axios';
// to make api calls
const url='http://localhost:3001/posts';  // points to our backend route

export const fetchPosts=()=>axios.get(url);
// to fetch data from routes

export const createPosts=(newPost)=>axios.post(url,newPost);

export const updatePost=(id,updatedPost)=>axios.patch(`${url}/${id}`,updatedPost);