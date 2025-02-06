import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const Navbar = () => {
    const { isAuth, Logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-blue " style={{opacity:"0.9"}} >
            <div className="container ">
                <img
                    src='/image/logo.jpeg'
                    alt='logo'
                    className="rounded-circle shadow-sm img-fluid me-2"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                {/* Brand Name */}
                <h2 className="navbar-brand text-light fw-bolder fs-5 my-auto  fs-md-3">
                    IT Computer Education World
                </h2>

                {/* Navbar Toggler Button for Mobile */}
                <button
                    className="navbar-toggler btn-sm "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" style={{ width: '20px', height: '20px' }}></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="ms-auto d-flex flex-wrap gap-2 mt-2 mt-lg-0">
                        <NavLink to='/'>
                            <button className="btn btn-outline-light">Home</button>
                        </NavLink>

                        <NavLink to='/about'>
                            <button className="btn btn-outline-light">About ITC</button>
                        </NavLink>

                        {isAuth && (
                            <NavLink to='/register'>
                                <button className="btn btn-outline-light">Register Student</button>
                            </NavLink>
                        )}

                        {/* {!isAuth ? (
                            <>
                                <NavLink to='/signup'>
                                    <button className="btn btn-outline-light">Sign up</button>
                                </NavLink>
                                <NavLink to='/login'>
                                    <button className="btn btn-outline-light">Log in</button>
                                </NavLink>
                            </>
                        ) : (
                            <NavLink to='/logout'>
                                <button className="btn btn-outline-light" onClick={Logout}>Log out</button>
                            </NavLink>
                        )} */}
                        {isAuth &&
                            <NavLink to='/logout'>
                                <button className="btn btn-outline-light" onClick={Logout}>Log out</button>
                            </NavLink>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
