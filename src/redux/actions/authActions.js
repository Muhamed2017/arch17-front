
import * as actions from '../constants'
import { auth, googleProvider, facebookProvider} from './../../firebase';
import axios from 'axios'
import {toast, Flip } from 'react-toastify';
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
export const createBrandVerifyNext = ()=>({
    type: actions.CREATE_BRAND_VERIFY_NEXT,
})
export const createBrandBrandNext = () => ({
    type: actions.CREATE_BRAND_BRAND_NEXT,
})

 const loadHomepageData = (homepage) => ({
    type: actions.LOAD_HOMEPAGE_DATA,
    payload:homepage
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

export const loadHomepage = (homepage)=>{
return (dispatch)=>{
    dispatch(loadHomepageData(homepage))
}
}
export const signupEmailPassword= (fname,lname, email, password, method)=>{
const displayName=`${fname} ${lname}`
    return (dispatch)=>{
        dispatch(emailPasswordSignup());
    
const fd = new FormData();
fd.append('password', password)
fd.append('password_confirmation',password)
fd.append('displayName', displayName)
fd.append('email', email)
    axios.post(`${actions.ENDPOINT}user/registration/signup`, fd).then((response)=>{
        const {user} = response.data
        console.log(response)
           dispatch(emailPasswordSignupSuccess(user))
                presistInfo(user, true)  

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
        // toast.success(`Welcome ${response.data.user.fname} ${response.data.user.lname}` + `You Can` + <a href=`user/settings/">Update it now</a>+ `Now`, {
        toast.success(<h2 style={{color:"#fff"}}>Welcome {response.data.user.fname} You Can Update Your profile from <a href="/user" style={{textDecoration:"underline", color:"#fff"}}>here</a></h2>, {
            position: toast.POSITION.BOTTOM_LEFT,
            theme: "colored",
            transition: Flip,
            closeOnClick: false,
            fontFamily: "Roboto",
            pauseOnHover: true,
            autoClose: 10000,
            style: {
            fontFamily: "Roboto",
            color:"#fff"
            },
        });
             console.log(response)
    }
   )
}
}

export const signinEmailPassword = (email, password, newName, newEmail, phone) => {
    const fd = new FormData()
    fd.append('email', email)
    fd.append('password', password)
    return (dispatch) => {
        dispatch(emailPasswordSignin())
        axios.post(`${actions.ENDPOINT}user/registration/signin`, fd).then((response)=>{
            const {user}= response.data
             dispatch(emailPasswordSigninSuccess(user))
            setUserInfoAction(user)
            console.log(user);
        })

    }
}

export const vanillaSigninEmailPassword = (email, password)=>{
return (dispatch)=>{
    const fd = new FormData()
    fd.append('email', email)
    fd.append('password', password)
    // return (dispatch) => {
        dispatch(emailPasswordSignin())
        axios.post(`${actions.ENDPOINT}user/registration/signin`, fd).then((response)=>{
            const {user}= response.data
             dispatch(emailPasswordSigninSuccess(user))
            setUserInfoAction(user)
        presistInfo(user, true)

        })
        
// }
}
}
// end of new login api without firebase

export const setUserInfoAction = (userData)=>{
    return (dispatch)=>{
        dispatch(setNavActionCreator(userData))
    }   
}
export const presistInfo = (info, loggingState)=>{
    const state = {
        info: info,
        isLoggedIn: loggingState,
        displayName:info.displayName,
        // photoURL:info.photoURL,
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
            if(userCredential.additionalUserInfo.isNewUser){
                const providerId = userCredential.user.providerData[0].providerId
                const {displayName, email, uid, photoURL} = userCredential.user
                registerUser(displayName, email, uid, providerId, photoURL ).then(()=>{
                dispatch(googleSignuoSuccess(userCredential.user))
                dispatch(updateInfo(userCredential.user))
                presistInfo(userCredential.user, true)  
                })
            }else{
                dispatch(googleSignuoSuccess(userCredential.user))
                dispatch(updateInfo(userCredential.user))
                presistInfo(userCredential.user, true)
            }
        }).catch((error) => {
            console.log(error.message)
        })
    }
}

export const signupFacebook= ()=>{
  return (dispatch) =>{
      dispatch(facebookSignupRequest());
      auth.signInWithPopup(facebookProvider).then((userCredential)=>{
        if(userCredential.additionalUserInfo.isNewUser){
                const providerId = userCredential.user.providerData[0].providerId
                const {displayName, email, uid, photoURL} = userCredential.user
                registerUser(displayName, email, uid, providerId, photoURL ).then(()=>{
                dispatch(facebookSignupSuccess(userCredential.user))
                dispatch(updateInfo(userCredential.user))
                presistInfo(userCredential.user, true)  
                })
            }else{
                dispatch(facebookSignupSuccess(userCredential.user))
                dispatch(updateInfo(userCredential.user))
                presistInfo(userCredential.user, true)
            }
      }).catch(error=>{
          console.log(error.message)
      })
  }  
}


const registerUser= async (displayName, email, uid, providerId, avatar)=>{
    const fd = new FormData()
    fd.append('displayName', displayName);
    fd.append('email', email);
    fd.append('uid', uid);
    fd.append('providerId', providerId);
    fd.append('avatar', avatar);
    await axios.post(`${actions.ENDPOINT}registeruser`, fd).then((repsonse)=>{
        console.log("Designer account created")
        console.log(repsonse)
    })
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

export const logginOut = () => {
    localStorage.removeItem('user');
    return (dispatch) => {
        dispatch(logout())
    }
}
