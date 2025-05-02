//To avoid not required unnecessary component we use 

import { createContext, useReducer, useEffect } from "react";

const initialState = {

    user: localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user')) 
        : null,
    loading: false,   //Initially false because no API request is happening yet
    error: null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    role: localStorage.getItem('role') ? localStorage.getItem('role') : null

}


export const AuthContext = createContext(initialState)   //() -> default inintial value is 0, instaed of using initial value, here we use state, so we have to provide initial state.


const AuthReducer = (state, action) => {

    //Whenever we are dispatch something, we are going to get the state and action.

    switch(action.type) {

        case "LOGIN_START":
        return {
            user: null,
            token: null,
            role: null,
            loading: false,
            error: null
        }

        case "LOGIN_SUCCESS":
        return {
            user: action.payload,
            token: action.token,
            role: action.role,
            loading: false,
            error: null
        }

        case "LOGIN_FAILURE":
        return {
            user: null,
            token: null,
            role: null,
            loading: false,
            error: action.payload
        }

        case "LOGOUT":
        return {
            user: null,
            token: null,
            role: null,
            loading: false,
            error: null
        }

        case "UPDATE_USER":
        return { 
            ...state, 
            user: { 
            ...state.user, 
            ...action.payload } 
        };

        case "DELETE_USER":
            return { 
            user: null, 
            token: null, 
            role: null, 
            loading: false, 
            error: null 
        };

        default:
        return state; //if we don't return anything, it will return the state as it is.
    }
};

export const AuthContextProvider = ({ children }) => {

const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(()=>{

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
        localStorage.setItem("role", state.role);

        // Clear localStorage when values are null
        if (!state.user) localStorage.removeItem("user");
        if (!state.token) localStorage.removeItem("token");
        if (!state.role) localStorage.removeItem("role");
    
    },[state]);

    return (

        <AuthContext.Provider

        value={{

            user: state.user,
            token: state.token,
            role: state.role,
            loading: state.loading,
            error: state.error,
            dispatch,
        
        }}>
            {children}

        </AuthContext.Provider>
    )
}