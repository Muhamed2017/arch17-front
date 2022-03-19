import * as actions from '../constants'

const userDefaultState ={
    // user:null,
    isLoggedIn:false,
    loading:false,
    normal_user:null,
}

const userInfo = JSON.parse(localStorage.getItem("normal_user")) ?? userDefaultState;

// firebase email/password authentication reducer ...
export const normalAuthenticationReducer = (state = userInfo, action)=>{
    switch (action.type) {
                case actions.NORMAL_SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                isLoggedIn: false
            }
        case actions.NORMAL_SIGNUP_SUCEESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                normal_user:action.payload
            }
        default:
            return state;
    }
}