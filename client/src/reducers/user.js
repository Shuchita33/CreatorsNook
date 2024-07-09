import { GETUSER, UPDATE_PROFILE, START_LOADING, END_LOADING, FETCH_POSTS_BY_USER } from "../constants/actionTypes";
const userReducer = (state = { isLoading: true, profile: [], posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return{...state,isLoading: true}
        case END_LOADING:
            return{...state,isLoading: false}
        case GETUSER:
            return { ...state, profile: action.payload };
        case UPDATE_PROFILE:
            return { ...state, profile: action.payload };
        case FETCH_POSTS_BY_USER:
            return { ...state, posts: action.payload };
        default:
            return state;
    }
};

export default userReducer;