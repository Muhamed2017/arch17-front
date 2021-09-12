
import * as actions from '../constants'
import { auth, googleProvider, facebookProvider} from './../../firebase';
import axios from 'axios'
import {toast, Flip, Bounce } from 'react-toastify';
import firebase from 'firebase';
export const emailPasswordSignup = ()=>({
    type:actions.SIGNUP_EMAIL_PASSWORD_REQUEST
})
export const emailPasswordSignin = () => ({
    type: actions.SIGNIN_EMAIL_PASSWORD_REQUEST
})
export const normalSignup = ()=>({
    type : actions.NORMAL_SIGNUP_REQUEST
})
export const normalSignin = () => ({
    type: actions.NORMAL_SIGNIN_REQUEST
})
export const emailPasswordSignupSuccess = user => ({
    type: actions.SIGNUP_EMAIL_PASSWORD_SUCCESS,
    payload: user
})
export const emailPasswordSigninSuccess = user => ({
    type: actions.SIGNIN_EMAIL_PASSWORD_SUCCESS,
    payload: user
})
export const googleSignup = user => ({
    type: actions.GOOGLE_SIGNUP_REQUEST,
    payload:user
})
export const facebookSignupRequest =() => ({
    type: actions.FACEBOOK_SIGNUP_REQUEST
})

export const facebookSignupSuccess = user => ({
    type: actions.FACEBOOK_SIGNUP_REQUEST_SUCCESS,
    payload:user
})
export const linkedinSignupRequest = () => ({
    type: actions.FACEBOOK_SIGNUP_REQUEST
})

export const linkedinSignupSuccess = (user) => ({
    type: actions.FACEBOOK_SIGNUP_REQUEST,
    payload:user
})

export const googleSignuoSuccess = user => ({
    type: actions.GOOGLE_SIGNUP_SUCCESS,
    payload: user
})
export const phoneSignupRequestCreator = () => ({
    type: actions.PHONE_SIGNUP_REQUEST,
})
export const phoneSignupSuccessCreator = user => ({
    type: actions.PHONE_SIGNUP_SUCCESS,
    payload: user
})
export const normalSignupSuccess = user => ({
    type: actions.NORMAL_SIGNUP_SUCEESS,
    payload: user
})
export const normalSigninSuccess = user => ({
    type: actions.NORMAL_SIGNIN_SUCEESS,
    payload: user
})
export const setNavActionCreator = info =>({
    type :actions.SET_NAV_INFO,
    payload:info
})
export const restNavinfo = info =>({
    type: actions.SET_NAV_INFO,
    payload: info
})
export const logout = ()=>{
    return {
        type: actions.LOGOUT
    }
}
export const updateInfo = (information)=>{
    return {
        type:actions.UPDATE_INFO,
        payload:information
    }
}

export const signupEmailPassword= (fullName, email, password)=>{
    return (dispatch)=>{
        dispatch(emailPasswordSignup());
        auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            userCredential.user.updateProfile({
                displayName: fullName,
            }).then(()=>{
                // setUserInfo(userCredential.user)
                dispatch(emailPasswordSignupSuccess(userCredential.user))
                // dispatch(updateInfo(userCredential.user))
                presistInfo(userCredential.user, true)
            })
        })
       
    }
}

export const normalSignupRequest= (fname, lname, email, password)=>{
const fd = new FormData();
return (dispatch)=>{
    fd.append('fname', fname)
    fd.append('lname', lname)
    fd.append('email', email)
    fd.append('password', password)
    fd.append('password_confirmation', password)
    dispatch(normalSignup())
    axios.post(`${actions.ENDPOINT}user/registration/signup`, fd)
    .then((response)=>{
        dispatch(normalSignupSuccess(response.data))
        setNormalUserInfo(response.data)
        toast.success(`Welcome ${response.data.user.fname} ${response.data.user.lname} You Can Update Your Profile Now`, {
            position: toast.POSITION.BOTTOM_CENTER,
            theme: "colored",
            transition: Flip,
        });
        console.log(response)
    }
   )
}
}

export const vanillaSigninEmailPassword = (email, password)=>{
return (dispatch)=>{
    dispatch(emailPasswordSignin())
    auth.signInWithEmailAndPassword(email, password).then((userCredential)=>{
        dispatch(emailPasswordSigninSuccess(userCredential.user))
        // setUserInfo(userCredential.user)
        // setUserInfoAction(userCredential.user)
        dispatch(emailPasswordSignupSuccess(userCredential.user))
        // dispatch(updateInfo(userCredential.user))
        presistInfo(userCredential.user, true)
        console.log(userCredential);
    })
}
}
export const signinEmailPassword = (email, password, newName, newEmail, phone) => {
    return (dispatch) => {
        dispatch(emailPasswordSignin())
        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            if(newName!=="" ){
                userCredential.user.updateProfile({
                    displayName: newName,
                }).then(()=>{
                    console.log("Name updated")
                    // setUserInfo(userCredential.user)
                    dispatch(setNavActionCreator(userCredential.user))
                })
            } if (newEmail != "") {
                userCredential.user.updateEmail(newEmail).then(() => {
                    // setUserInfo(userCredential.user)
                    // setUserInfoAction(userCredential.user)
                    console.log("email updated")
                    console.log(newEmail, auth.currentUser)
                })
            }
            if (phone != "") {
                userCredential.user.updatePhoneNumber(phone).then(() => {
                    console.log("phone updated")
                    setUserInfoAction(userCredential.user)
                })
            }
            dispatch(emailPasswordSigninSuccess(userCredential.user))
            // setUserInfo(userCredential.user)
            setUserInfoAction(userCredential.user)
            console.log(userCredential);
        })

    }
}

export const setUserInfoAction = (userData)=>{
    return (dispatch)=>{
        dispatch(setNavActionCreator(userData))
    }
    
}
// export const setUserInfo = (userData)=>{
//     const state = {
//         user : userData,
//         isLoggedIn:true,
//         loading:false
//     }
//     localStorage.setItem('user',JSON.stringify(state))
// }
export const presistInfo = (info, loggingState)=>{
    const state = {
        info: info,
        isLoggedIn: loggingState,
        displayName:info.displayName,
        photoURL:info.photoURL,
        email:info.email
    }
    localStorage.setItem('user' ,JSON.stringify(state))
}
export const setNavInfo=(info)=>{}

const setNormalUserInfo = (userData) => {
 
    const state = {
        normal_user: userData,
        isLoggedIn: true,
        loading: false
    }
    localStorage.setItem('normal', JSON.stringify(state))
}
export const signupGoogle = () => {
    return (dispatch) => {
        dispatch(googleSignup());
        auth.signInWithPopup(googleProvider).then((userCredential) => {
            console.log(userCredential.user)
            dispatch(googleSignuoSuccess(userCredential.user))
            dispatch(updateInfo(userCredential.user))
            presistInfo(userCredential.user, true)
            // setUserInfo(userCredential.user)
            // dispatch(setNavActionCreator(auth.currentUser))
        }).catch((error) => {
            console.log(error.message)
        })
    }
}
export const phoneSigninRequest = ()=>{
return (dispatch)=>{
    dispatch(phoneSignupRequestCreator())
}
}
export const phoneSignupSuccess = (user)=>{
    return (dispatch)=>{
        dispatch(phoneSignupSuccessCreator(user))        
    }
}
export const signupFacebook= ()=>{
  return (dispatch) =>{
      dispatch(facebookSignupRequest());
      auth.signInWithPopup(facebookProvider).then((userCredential)=>{
          console.log(userCredential.user)
          dispatch(facebookSignupSuccess(userCredential.user))
          dispatch(updateInfo(userCredential.user))
          presistInfo(userCredential.user, true)
      }).catch(error=>{
          console.log(error.message)
      })
  }  
}
export const logginOut = () => {
    localStorage.removeItem('user');
    return (dispatch) => {
        dispatch(logout())
    }
}

