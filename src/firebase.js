import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_KEY,
    apiKey: 'AIzaSyCFkvNWsIFfBw2t68FIKvtmzLF-un6i7Oc',
    authDomain: 'testing-28f3c.firebaseapp.com',
    databaseURL:"https://testing-28f3c.firebaseio.com",
    projectId: 'testing-28f3c',
    storageBucket: 'testing-28f3c.appspot.com',
    messagingSenderId: '696071352639',
    appId: '1:696071352639:web:602e27e9a04e15c2f7e38a',
    measurementId: 'G-SLP0R5NV12'

    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID ,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

export const auth= app.auth();

export const  googleProvider = new firebase.auth.GoogleAuthProvider();

// export const twitterProvider = new firebase.auth.TwitterAuthProvider();
// export const phoneProvider = new firebase.auth.PhoneAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default app;