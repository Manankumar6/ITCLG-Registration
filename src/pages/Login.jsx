import React from 'react';
import { useAuth } from '../Context/Auth';

const Login = () => {
   
    const {Login,handleInput, data} = useAuth()

    return (
        <div className='container ' style={{minHeight:"82vh"}}>
            <form className='p-5' onSubmit={Login}>
                <h2 className="mb-4">Login</h2>
               
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
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleInput}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;
