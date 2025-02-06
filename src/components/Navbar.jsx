import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../Context/Auth'

const Navbar = () => {
    const { isAuth, Logout } = useAuth()

    return (
        <div>
            <nav className="navbar " style={{ background: "#e3f2fd" }}>
                <div className="container">
                    <h2 className="navbar-brand text-danger fw-bolder fs-2">IT Computer Education World</h2>
                    <form className="d-flex " >


                        <NavLink to='/'>
                            <button className="btn btn-outline-danger mx-1">Home</button>
                        </NavLink>

                        <NavLink to='/about'>
                            <button className="btn btn-outline-danger mx-1">About ITC</button>
                        </NavLink>
                       {isAuth&& <NavLink to='/register'>
                            <button className="btn btn-outline-danger mx-1">Register Student</button>
                        </NavLink>}
                        {!isAuth ? (
                            <>
                                <NavLink to='/signup'>
                                    <button className="btn btn-outline-danger mx-1">Sign up</button>
                                </NavLink>
                                <NavLink to='/login'>
                                    <button className="btn btn-outline-danger mx-1">Log in</button>
                                </NavLink>
                            </>
                        )
                            :
                            <NavLink to='/logout'>
                                <button className="btn btn-outline-danger mx-1" onClick={Logout}>Log out</button>
                            </NavLink>}
                    </form>
                </div>
            </nav >
        </div >
    )
}

export default Navbar
