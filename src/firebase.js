import firebase from 'firebase/app'
// import * firebase from 'firebase/auth/dist/'
import 'firebase/auth'
const configs = {
    apiKey: 'AIzaSyCFkvNWsIFfBw2t68FIKvtmzLF-un6i7Oc',
    authDomain: 'testing-28f3c.firebaseapp.com',
    databaseURL:"https://testing-28f3c.firebaseio.com",
    projectId: 'testing-28f3c',
    storageBucket: 'testing-28f3c.appspot.com',
    messagingSenderId: '696071352639',
    appId: '1:696071352639:web:602e27e9a04e15c2f7e38a',
    measurementId: 'G-SLP0R5NV12'
}
const app = firebase.initializeApp(configs);
export const auth = app.auth();
auth.setPersistence('local').then(()=>{
    console.log("forever")
})
// export const fire= firebase.initializeApp(configs)
// firebase.auth.PhoneAuthProvider
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const linkedinProvider = new firebase.auth.LinkedinAuthProvider();
export const phoneProvider = new firebase.auth.PhoneAuthProvider();
// const applyCode = auth.applyActionCode('keneknekn')
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default app;
