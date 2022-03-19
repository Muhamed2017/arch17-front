import * as actions from '../constants'
// import { auth, googleProvider, facebookProvider } from './../../firebase';
const userDefaultState ={
    user:null,
    isLoggedIn:false,
    loading:false,
    info:null,
    displayName:null,
    photoURL:null,
    brandStep:0
}

const userInfo = JSON.parse(localStorage.getItem("user")) ?? userDefaultState;
// firebase email/password authentication reducer ...
export const firebaseEmailPasswordReducer = (state = userInfo, action)=>{
    switch (action.type) {
        case actions.SIGNUP_EMAIL_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true
            }
        case actions.SIGNUP_EMAIL_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                user:action.payload,
                isLoggedIn:true,
                info:action.payload,
                photoURL: action.payload.photoURL,
                displayName: action.payload.displayName,
                email: action.payload.email,
            }
        case actions.SET_NAV_INFO:
            return {
                ...state,
                loading:false,
                user:action.payload,
                isLoggedIn:true,
                info: action.payload,
                photoURL: action.payload.photoURL,
                displayName: action.payload.displayName,
            }
        case actions.SIGNUP_EMAIL_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,

            }
        case actions.SIGNIN_EMAIL_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actions.SIGNIN_EMAIL_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                user:action.payload,
                isLoggedIn: true,
                info: action.payload,
                photoURL: action.payload.photoURL,
                displayName: action.payload.displayName,
            }
        case actions.VANILLA_SIGNIN_EMAIL_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                user:action.payload,
                isLoggedIn: true,
                info: action.payload,
                photoURL: action.payload.photoURL,
                displayName: action.payload.displayName,
            }   
        case actions.SIGNIN_EMAIL_PASSWORD_FAIL:
            return {
                ...state,
                loading: false
            }
        case actions.FACEBOOK_SIGNUP_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLoggedIn: true,
                info: action.payload,
                photoURL: action.payload.photoURL,
                displayName: action.payload.displayName,

            }
        case actions.FACEBOOK_SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actions.GOOGLE_SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLoggedIn: true,
                info: action.payload,
                photoURL: action.payload.photoURL,
                displayName: action.payload.displayName,
            }
            case actions.PHONE_SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                isLoggedIn: false,

            }
        case actions.PHONE_SIGNUP_SUCCESS:
            return {
                ...state,
                user:action.payload,
                info:action.payload,
                loading: false,
                isLoggedIn: true,
                photoURL: action.payload.photoURL,
                displayName: action.payload.displayName,

            }
        case actions.LOGOUT:
                return {
                    ...state,
                    user:null,
                    isLoggedIn:false,
                    info:null
                }
                case actions.UPDATE_INFO:
                return {
                    ...state,
                    displayName:action.payload.displayName,
                    photoURL:action.payload.photoURL?? action.payload.photoUrl,
                email: action.payload.email,
                }
            case actions.CREATE_BRAND_VERIFY_NEXT:
            return {
                ...state,
                brandStep: 1
            }
        case actions.CREATE_BRAND_BRAND_NEXT:
            return {
                ...state,
                brandStep: 2
            }
        default:
            return state;
    }
}