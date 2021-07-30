
import * as actions from '../constants'
import { auth, googleProvider, facebookProvider} from './../../firebase';

export const emailPasswordSignup = ()=>({
    type:actions.SIGNUP_EMAIL_PASSWORD_REQUEST
})
export const emailPasswordSignin = () => ({
    type: actions.SIGNIN_EMAIL_PASSWORD_REQUEST
})
// export const emailPasswordSigninSuccess = (user) => ({
//     type: actions.SIGNIN_EMAIL_PASSWORD_SUCCESS,
//     payload:user
// })
export const emailPasswordSignupSuccess = user => ({
    type: actions.SIGNUP_EMAIL_PASSWORD_SUCCESS,
    payload: user
})
export const emailPasswordSigninSuccess = user => ({
    type: actions.SIGNUP_EMAIL_PASSWORD_SUCCESS,
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
export const googleSignuoSuccess = user => ({
    type: actions.GOOGLE_SIGNUP_SUCCESS,
    payload: user
})

export const logout = ()=>{
    return {
        type: actions.LOGOUT
    }
}


export const signupEmailPassword= (fullName, email, password)=>{
    return (dispatch)=>{
        dispatch(emailPasswordSignup());
        auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            userCredential.user.updateProfile({
                displayName: fullName,
                // photoURL: 'ksmksmksmskmskmskmsksmksmskm'
            }).then(()=>{
                setUserInfo(userCredential.user)
                dispatch(emailPasswordSignupSuccess(userCredential.user))
            })
            console.log(userCredential);
        })
    }
}


export const signinEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(emailPasswordSignin());
        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
                setUserInfo(userCredential.user)
                dispatch(emailPasswordSigninSuccess(userCredential.user))
            console.log(userCredential);
        })
    }
}
const setUserInfo = (userData)=>{
    // const user ={
    //     userId: userData.uid,
    //     userFullName:userData.displayName,
    //     userEmail:userData.email,
    //     userPhotoUrl:userData.photoURL,
    //     userPhoneNum:userData.phoneNumber,
    //     userEmailVerified:userData.emailVerified,
    //     userProviderId:userData.providerData.providerId,
    // }
    const state = {
        user : userData,
        isLoggedIn:true,
        loading:false
    }
    localStorage.setItem('user',JSON.stringify(state))
}

export const signupGoogle = () => {
    return (dispatch) => {
        dispatch(googleSignup());
        auth.signInWithPopup(googleProvider).then((userCredential) => {
            console.log(userCredential.user)
            dispatch(googleSignuoSuccess(userCredential.user))
            setUserInfo(userCredential.user)
        }).catch((error) => {
            console.log(error.message)
        })
    }
}
export const signupFacebook= ()=>{
  return (dispatch) =>{
      dispatch(facebookSignupRequest());
      auth.signInWithPopup(facebookProvider).then((userCredential)=>{
          console.log(userCredential.user)
          dispatch(facebookSignupSuccess(userCredential.user))
          setUserInfo(userCredential.user)
      }).catch(error=>{
          console.log(error.message)
      })
  }  
}
export const logginOut = () => {
    localStorage.removeItem('user');
    return (dispatch)=>{
        dispatch(logout())
    }
}
