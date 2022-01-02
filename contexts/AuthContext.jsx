import React, { useContext, useState } from 'react';

import UserService from '../services/UserService';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const userService = new UserService();

    const [currentUser, setCurrentUser] = useState();

    function signup(formData, success, error){
        userService.signup(formData, (res) => {
            setCurrentUser(res);
            success(res);
        }, (err) => {
            if(err.errors){
                error(err.errors);
            } else {
                var { message } = err;
                error({ message });
            }
        })
    }
    function signin(formData, success, error){
        userService.signin(formData, (res) => {
            setCurrentUser(res);
            success(res);
        }, (err) => {
            error(err);
        })
    }
    /*function logout(success, error){
        userService.signout( () => {
            setCurrentUser();
            success();
        }, (err) => {
            error(err);
        })
    }*/

    const value = {
        currentUser,
        setCurrentUser,
        signup,
        signin,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}
