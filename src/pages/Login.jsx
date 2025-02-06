import React, { useState } from 'react';
import { useAuth } from '../Context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye ,FaRegEyeSlash} from "react-icons/fa";

const Login = () => {

    const { Login, handleInput, data, isAuth } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
 
    if (isAuth) {
        navigate('/')
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="mb-4 text-center">Login</h2>
                <form onSubmit={Login}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleInput}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <hr className="my-4" />
                <p className="text-center">Or</p>

                {/* Footer: Signup Link */}
                <p className="text-center mt-3">
                    Don't have an account? 
                    <Link to="/signup" className="ms-1 text-primary text-decoration-none">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>

    );
};

export default Login;
