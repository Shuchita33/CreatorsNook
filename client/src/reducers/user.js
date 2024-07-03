import { GETUSER, UPDATE_PROFILE } from "../constants/actionTypes";
const userReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
        case GETUSER:
            return { ...state, profile: action.payload };
        case UPDATE_PROFILE:
            return { ...state, profile: action.payload };
        default:
            return state;
    }
};

export default userReducer;