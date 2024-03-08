import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar " style={{background:"#e3f2fd"}}>
                <div className="container">
                    <h2 className="navbar-brand text-danger fw-bolder fs-2">ITC Learning Group</h2>
                    <form className="d-flex " >

                        <NavLink to='/'>
                            <button className="btn btn-outline-primary mx-1">Home</button>
                        </NavLink>
                        <NavLink to='/admin'>
                            <button className="btn btn-outline-primary mx-1">Admin ?</button>
                        </NavLink>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
