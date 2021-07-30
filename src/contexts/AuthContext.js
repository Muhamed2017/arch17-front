import React, { useContext, useEffect, useState } from "react";
import { auth } from './../firebase';

const AuthContext= React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}


const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState();
    const signup = ( email, password)=> {
        return auth.createUserWithEmailAndPassword(email, password).then((userCredential)=>{
            userCredential.user.updateProfile({
                displayName: 'Mido Gomaa',
                photoURL:'ksmksmksmskmskmskmsksmksmskm'  
            })
        })
    } 

    const signin = (email, password)=>{
        return auth.signInWithEmailAndPassword(email, password).then((userCredential)=>{
            console.log(userCredential.user)
        })
    }

   useEffect(()=>{
       const unsubscribe = auth.onAuthStateChanged(user => {
           setCurrentUser(user)
       })
       return unsubscribe
   }, [])
    const value = {
        currentUser, 
        signup,
        signin
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider