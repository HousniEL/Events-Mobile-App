import React, { useContext, useState } from 'react';

import { openid, signup, signin, signout } from '../services/UserService';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();

    function openID(formData, success, error){
        openid(formData, (res) => {
            setCurrentUser(user);
            success();
        }, (err) => {
            error(err);
        });
    }

    function signUp(formData, success, error){
        signup(formData, (res) => {
            setCurrentUser(res.user);
            success();
        }, (err) => {
            error(err);
        })
    }
    function signIn(formData, success, error){
        signin(formData, (res) => {
            setCurrentUser(res.user);
            success();
        }, (err) => {
            error(err);
        })
    }
    
    function logout(success, error){
        signout( () => {
            setCurrentUser();
            success();
        }, (err) => {
            error(err);
        })
    }

    function getCurrentUser(){
        return currentUser;
    }

    const value = {
        getCurrentUser,
        setCurrentUser,
        openID,
        signUp,
        signIn,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}
