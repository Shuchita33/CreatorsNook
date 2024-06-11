const reducer=(posts_state=[],action)=>{
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;   //actual data
          
        case 'CREATE':
            return action.payload;
        default:
            return posts_state;
           
    }
}

export default reducer;