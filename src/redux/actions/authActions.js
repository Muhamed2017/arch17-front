
import * as actions from '../constants'
import { auth, googleProvider, facebookProvider} from './../../firebase';
import axios from 'axios'
import {toast, Flip, Bounce } from 'react-toastify';
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

export const signupEmailPassword= (fname,lname, email, password, method)=>{
const displayName=`${fname} ${lname}`
    return (dispatch)=>{
        dispatch(emailPasswordSignup());
       if(method==='firebase'){
            auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            userCredential.user.updateProfile({
                displayName: displayName,
            }).then(()=>{
                const providerId = userCredential.user.providerData[0].providerId
                const {displayName, email, uid, photoURL} = userCredential.user
                registerUser(displayName, email, uid, providerId, photoURL ).then(()=>{
                dispatch(emailPasswordSignupSuccess(userCredential.user))
                presistInfo(userCredential.user, true)     
                })               
            })
        })
       }
        if(method==='regular'){
              const formData = new FormData();
              formData.append("fname", fname);
              formData.append("lname", lname);
              formData.append("email", email);
              formData.append("password", password);
              axios
              .post(`${actions.ENDPOINT}user/register`, formData)
                    .then((response) => {
                        console.log(response.data.user);
                        dispatch(emailPasswordSignupSuccess(response.data.user))
                        presistInfo(response.data.user, true);
                    })
                    .catch((error) => {
                    console.log(error);
                    });
        }  
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

export const vanillaSigninEmailPassword = (email, password)=>{
return (dispatch)=>{
    dispatch(emailPasswordSignin())
    auth.signInWithEmailAndPassword(email, password).then((userCredential)=>{
        dispatch(emailPasswordSigninSuccess(userCredential.user))
        dispatch(emailPasswordSignupSuccess(userCredential.user))
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

// export const brandNext = ()=>{
//     return (dispatch)=>{
//         dispatch(createBrandNext())
//     }  
// }
// export const brandPrevious = () => {
//     return (dispatch) => {
//         dispatch(createBrandPrevious())
//     }
// }
