import React, { useState } from 'react';
import { useAuth } from '../Context/Auth';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom"; // Import Link from React Router

const Signup = () => {
    const {Signup,handleInput, data,isAuth} = useAuth()
    const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate()
    if (isAuth) {
        navigate('/')
    }
   return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="mb-4 text-center">Sign Up</h2>
                <form onSubmit={Signup}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={data.username}
                            onChange={handleInput}
                            required
                        />
                    </div>

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
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>

                {/* Divider */}
                <hr className="my-4" />
                <p className="text-center">Or</p>

                {/* Footer: Login Link */}
                <p className="text-center mt-3">
                    Already have an account?
                    <Link to="/login" className="ms-1 text-primary text-decoration-none">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
