import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import reducer from '../Reducer/authreducer';
import {toast} from "react-toastify"
const AuthContext = createContext();

const initialState = {
    isLoading: false,
    data: {
        username: "",
        email: "",
        password: ""
    },
    isAuth: false,
   
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    let URL = process.env.REACT_APP_API_URL
   
    const Signup = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOADING' });
    
        try {
            const response = await fetch(`${URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state.data),
            });
    
            if (response.ok) {
                const result = await response.json();
                dispatch({ type: 'USER_SIGNUP' });
                dispatch({ type: 'SUCCESS', payload: result });
                console.log('Form submitted successfully:', result);
                navigate('/login');
            }else{
                const errorResponse = await response.json();
                toast.error(errorResponse.message)
              
            }
        } catch (error) {
            toast.error("Internal Server Error")
            console.log('Network error:', error.message);
        }
    };
    
    const Login = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOADING' });
        try {
            const response = await fetch(`${URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state.data),
                credentials: 'include',
            });
           
            if (response.ok) {
                const result = await response.json();
                dispatch({ type: 'USER_LOGIN' });
            
              
                navigate('/register')
                toast.success(result.message)
            } else{
                toast.error("Invaild Credentials")
            }
        } catch (error) {
            // setError(`Network error: ${error.message}`);
            console.error('Network error:', error);
            toast.error("Internal Server Error")
           
        }
    };
    const Logout = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await fetch(`${URL}/api/logout`, {
                method: 'POST',
                credentials: 'include',
            });
    
            if (response.ok) {
                dispatch({ type: 'USER_LOGOUT' }); // Dispatch logout action if needed
                console.log('Logged out successfully');
                navigate('/')
            } 
        } catch (error) {
            console.error('Logout error:', error.message);
            toast.error("Internal Server Error")
        }
    };
    const handleInput = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'HANDLE_INPUT', payload: { name, value } });
    };

    const getUser = async () => {
         try {
            const response = await fetch(`${URL}/api/me`, {
                method: 'GET',
                credentials: 'include',
            });
           
            if (response.ok) {
                const result = await response.json();
             console.log(result)
             dispatch({type:"LOAD_USER",payload:result})
              
              
            } else{
                const errorResponse = await response.json();
                console.log(errorResponse.message)
            }
        } catch (error) {
            // setError(`Network error: ${error.message}`);
            console.error('Network error:', error);
            toast.error("Internal Server Error form getuser")
           
        }
    };
    useEffect(()=>{
        getUser()
        // eslint-disable-next-line
    },[])
    return (
        <AuthContext.Provider value={{ ...state, Signup,Login,Logout, handleInput }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthProvider };
