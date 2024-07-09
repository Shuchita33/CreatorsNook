import axios from 'axios';                // to make api calls
//const url='http://localhost:3001/';  // points to our backend route
const API=axios.create({baseURL:'https://creatorsnook.onrender.com/'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        JSON.parse(localStorage.getItem('profile'))
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const comment=(value,id)=>API.post(`/posts/${id}/commentPost`,{value});
export const deleteComment = (id, index) => API.patch(`/posts/${id}/deleteComment`, { index });
export const fetchPost=(id)=>API.get(`/posts/${id}`);
export const fetchPosts=(page)=>API.get(`/posts?page=${page}`);  // to pass page number on which we are
export const createPosts=(newPost)=>API.post('/posts',newPost);
export const updatePost=(id,updatedPost)=>API.patch(`${'/posts'}/${id}`,updatedPost);
export const deletePosts=(id)=>API.delete(`${'/posts'}/${id}`);
export const likePost=(id)=>API.patch(`${'/posts'}/${id}/likePost`);
export const fetchPostsBySearch=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const signIn=(formData)=>API.post('/user/signin',formData);
export const signUp=(formData)=>API.post('/user/signup',formData);
export const updateUsername=(id,name)=>API.patch(`/user/${id}`,{name});

export const viewProfile=(id)=>API.get(`/user/${id}/profile`);
export const createProfile=(formData)=>API.post(`/user`,formData);
export const updateProfile = (id, profileData) => API.patch(`/user/updateProfile/${id}`, profileData);

export const fetchPostsByUser = (userId, username) => API.get(`/user/${userId}`, {params: { username }}); 