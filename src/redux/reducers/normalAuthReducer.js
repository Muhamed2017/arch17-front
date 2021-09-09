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
        // case actions.SIGNUP_EMAIL_PASSWORD_REQUEST:
        //     return {
        //         ...state,
        //         loading:true
        //     }
        // case actions.SIGNUP_EMAIL_PASSWORD_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         user:action.payload,
        //         isLoggedIn:true
        //     }
        // case actions.SIGNUP_EMAIL_PASSWORD_FAIL:
        //     return {
        //         ...state,
        //         loading: false,

        //     }
        // case actions.SIGNIN_EMAIL_PASSWORD_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //     }
        // case actions.SIGNIN_EMAIL_PASSWORD_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         isLoggedIn: true
        //     }
        // case actions.SIGNIN_EMAIL_PASSWORD_FAIL:
        //     return {
        //         ...state,
        //         loading: false
        //     }
        // case actions.FACEBOOK_SIGNUP_REQUEST_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         user: action.payload,
        //         isLoggedIn: true
        //     }
        // case actions.FACEBOOK_SIGNUP_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //     }

        // case actions.GOOGLE_SIGNUP_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         user: action.payload,
        //         isLoggedIn: true
        //     }
            // case actions.LOGOUT:
            //     return {
            //         ...state,
            //         user:null,
            //         isLoggedIn:false
            //     }
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