import * as actions from '../constants';

const defaultPostState={
    spinner:false
}

const postReducer = (state= defaultPostState, action)=>{
    switch (action) {
        case actions.ADD_POST_REQUEST:
            return {
                ...state,
                spinner:true
            }
        case actions.ADD_POST_SUCCESS:
            return {
                ...state,
                spinner: false
            }
        case actions.ADD_POST_FAILUIER:
            return {
                ...state,
                spinner: false
            }
    
        default:
            return state
    }
}


export default postReducer; 