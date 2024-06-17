import {CREATE,DELETE,UPDATE,FETCH_ALL,LIKE,FETCH_BY_SEARCH} from '../constants/actionTypes';
const reducer=(posts_state=[],action)=>{
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;   //actual data
         
        case CREATE:
            return [...posts_state,action.payload]; 

        case UPDATE:
        case LIKE:
            return posts_state.map((post)=>
                post._id===action.payload._id? action.payload:post
            )

        case DELETE:
            return posts_state.filter((post)=>post._id!==action.payload._id)

        case FETCH_BY_SEARCH:
            return action.payload;

        default:
            return posts_state;          
    }
}
export default reducer;