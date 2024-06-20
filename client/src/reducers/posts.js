import {CREATE,DELETE,UPDATE,FETCH_ALL,LIKE,FETCH_BY_SEARCH,START_LOADING,END_LOADING,FETCH_POST, COMMENT} from '../constants/actionTypes';
const reducer=(state={isLoading:true,posts:[]},action)=>{
    switch (action.type) {
        case START_LOADING:
            return{...state,isLoading: true}

        case END_LOADING:
            return{...state,isLoading: false}
        case FETCH_ALL:   //actual data returned which is an object
            return {
                ...state,
                posts:action.payload.data,
                currentPage:action.payload.currentPage,
                numberOfPages:action.payload.numberofPages,
            }
        case CREATE:
            return {...state,posts:[...state.posts,action.payload]}; 

        case UPDATE:
        case LIKE:
            return {...state,posts:state.posts.map((post)=>
                post._id===action.payload._id? action.payload:post
            )}
        case COMMENT:
            return{
                ...state, posts:state.posts.map((post)=>{
                    if(post._id===action.payload._id){
                        return action.payload;
                    }
                    return post;
                })
            }
        case DELETE:
            return {...state,posts:state.posts.filter((post)=>post._id!==action.payload._id)}

        case FETCH_BY_SEARCH:
            console.log(action.payload);
            return {...state, posts:action.payload};
        
        case FETCH_POST:
            return {...state, post:action.payload};
        default:
            return state;          
    }
}
export default reducer;