import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config'
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios'
export const AuthContext= createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    // create an ccount
    const createUsers=(email,password)=>{
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        
    }
    
    //sign up with gmai
    const signUpWithGmail =()=>{
     
        return signInWithPopup(auth, googleProvider)
    }
    
    
    // login using email and password
    const login = (email, password) => {
        // You can keep setLoading(true) if you want to manage loading state
        return signInWithEmailAndPassword(auth, email, password);
    };
    // logout
    const logout=()=>{

        return signOut(auth);
    }
    const updateUserprofile=(name,photoURL)=>{
        return updateProfile(auth.currentUser, {
             displayName: name, photoURL: photoURL
          });
    };
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser); // Set the current user (could be null if not logged in)
        if(currentUser){

            const userINfo={email:currentUser.email}
            axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`,userINfo)
              .then(response => {
                // console.log('Success:', response.data);
                if(response.data.token){
                    localStorage.setItem("access-token",response.data.token);
                }
              })
              .catch(error => {
                console.error('Error:', error);
              });
        }
        else{
            localStorage.removeItem('access-token');
        }
        setLoading(false); // Stop the loading once the user state is set
    });
    return () => {
        return unsubscribe();
    }
}, []);



    const authInfo={
        user,
        createUsers,
        signUpWithGmail,
        login,
        logout,
        updateUserprofile,
        loading,
        setLoading,

    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider