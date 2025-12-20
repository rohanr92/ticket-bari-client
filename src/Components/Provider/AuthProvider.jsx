import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.config';



const AuthProvider = ({ children }) => {

    const auth = getAuth(app);
    

    const provider = new GoogleAuthProvider();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false))
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

        });

        return () => {
            unsubscribe();
        }
    }, []);

    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }

   const updatedProfile = (name, imageURL, user = auth.currentUser) => {
        return updateProfile(user, {
            displayName: name,
            photoURL: imageURL
        });
    };

    const forgotPass = (email) => {

        return sendPasswordResetEmail(auth, email)
        .finally(() => setLoading(false));


    }


    const logOut = () => {
        setLoading(true);
        return signOut(auth)
        .finally(()=> {
            setLoading(false);
        })
    }

    const AuthData = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        googleLogin,
        updatedProfile,
        forgotPass,
        logOut
    }

    return <AuthContext.Provider value={AuthData}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;