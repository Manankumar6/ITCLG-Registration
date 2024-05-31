const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
                isError: "",
                isSuccess: ""
            };
        case 'HANDLE_INPUT':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.name]: action.payload.value
                }
            };
        case 'USER_SIGNUP':
            return {
                ...state,
                isLoading: false
            };
        case 'USER_LOGIN':
            return {
                ...state,
                isAuth: true,
                isLoading: false
            };
        case "LOAD_USER":
            return {
                ...state,
                isAuth: true,
                isLoading: false
            }
        // case 'SUCCESS':
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isSuccess: action.payload,  // Ensure payload contains only the success message
        //         data: {
        //             username: "",
        //             email: "",
        //             password: ""
        //         }
        //     };
        // case 'ERROR':
        //     return {
        //         ...state,
        //         isLoading: false,
        //         isError: action.payload  // Ensure payload contains only the error message
        //     };
        case "USER_LOGOUT":
            return {
                ...state,
                isAuth: false,
                isLoading: false
            };
        default:
            return state;
    }
}

export default AuthReducer;
