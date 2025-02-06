import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const Navbar = () => {
    const { isAuth, Logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg" style={{ background: "#e3f2fd" }}>
            <div className="container ">
                {/* Brand Name */}
                <h2 className="navbar-brand text-danger fw-bolder fs-5 my-auto  fs-md-3">
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
                            <button className="btn btn-outline-danger">Home</button>
                        </NavLink>

                        <NavLink to='/about'>
                            <button className="btn btn-outline-danger">About ITC</button>
                        </NavLink>

                        {isAuth && (
                            <NavLink to='/register'>
                                <button className="btn btn-outline-danger">Register Student</button>
                            </NavLink>
                        )}

                        {/* {!isAuth ? (
                            <>
                                <NavLink to='/signup'>
                                    <button className="btn btn-outline-danger">Sign up</button>
                                </NavLink>
                                <NavLink to='/login'>
                                    <button className="btn btn-outline-danger">Log in</button>
                                </NavLink>
                            </>
                        ) : (
                            <NavLink to='/logout'>
                                <button className="btn btn-outline-danger" onClick={Logout}>Log out</button>
                            </NavLink>
                        )} */}
                        {isAuth &&
                            <NavLink to='/logout'>
                                <button className="btn btn-outline-danger" onClick={Logout}>Log out</button>
                            </NavLink>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
