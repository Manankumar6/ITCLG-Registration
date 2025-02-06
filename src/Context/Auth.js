import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import reducer from '../Reducer/authreducer';
import { toast } from "react-toastify"
const AuthContext = createContext();

const initialState = {
    isLoading: false,
    data: {
        username: "",
        email: "",
        password: ""
    },
    isAuth: false,
    user: {},
    isSuccess: false

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

                navigate('/login');
            } else {
                const errorResponse = await response.json();
                toast.error(errorResponse.message)

            }
        } catch (error) {
            toast.error("Internal Server Error")
            // console.log('Network error:', error.message);
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
    
                await getUser(); // Ensure user state is updated before redirecting
                toast.success(result.message);
                navigate('/');
    
            } else {
                toast.error("Invalid Credentials");
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error("Internal Server Error");
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
                dispatch({ type: 'USER_LOGOUT' });
                toast.success("Logout successful");
                navigate('/login'); 
            } else {
                toast.error("Failed to log out");
            }
        } catch (error) {
            console.error('Logout error:', error.message);
            toast.error("Internal Server Error");
        }
    };
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'HANDLE_INPUT', payload: { name, value } });
    };

    const getUser = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await fetch(`${URL}/api/me`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {

                    dispatch({ type: "LOAD_USER", payload: result })
                }


            }
           

        } catch (error) {
            // setError(`Network error: ${error.message}`);
            dispatch({ type: "LOAD_USER_ERROR" })
            console.error('Network error:', error);
           

        }
    };

    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    }, [])



    return (
        <AuthContext.Provider value={{ ...state, Signup, Login, Logout, handleInput }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthProvider };
