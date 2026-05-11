import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const Navbar = () => {
    const { isAuth, Logout } = useAuth();

    // Helper to close the menu on mobile after clicking a link
    const closeMenu = () => {
        const menu = document.getElementById('navbarNav');
        if (menu.classList.contains('show')) {
            new window.bootstrap.Collapse(menu).hide();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-blue sticky-top shadow-sm" style={{ opacity: "0.95" }}>
            <div className="container p-0">
                {/* Brand Logo & Name */}
                <NavLink to={'/'} className="navbar-brand d-flex align-items-center" onClick={closeMenu}>
                    <img
                        src='/image/logo.jpeg'
                        alt='logo'
                        className="rounded-circle me-2"
                        style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid white" }}
                    />
                    <span className="text-light fw-bold fs-6 fs-md-5">   IT Computer Education World</span>
                </NavLink>

                {/* Mobile Toggler */}
                <button
                    className="navbar-toggler border-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                </button>

                {/* Links Wrapper */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-1 mt-3 mt-lg-0 align-items-lg-center">
                        {/* <li className="nav-item">
                            <NavLink to='/' className="nav-link text-light px-3" onClick={closeMenu}>Home</NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink to='/about' className="nav-link text-light px-3" onClick={closeMenu}>About</NavLink>
                        </li>

                        {isAuth && (
                            <>
                                <li className="nav-item">
                                    <NavLink to='/register' className="nav-link text-light px-3" onClick={closeMenu}>Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/attendancerecord' className="nav-link text-light px-3" onClick={closeMenu}>Attendance</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/studentrecord-update' className="nav-link text-light px-3" onClick={closeMenu}>Records</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/certificateview' className="nav-link text-light px-3" onClick={closeMenu}>Verify Certificates</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/certificaterecord' className="nav-link text-light px-3" onClick={closeMenu}>Certificates Record</NavLink>
                                </li>
                                <li className="nav-item ms-lg-2">
                                    <button 
                                        className="btn btn-sm btn-danger w-100 w-lg-auto px-3 rounded-pill shadow-sm" 
                                        onClick={() => { Logout(); closeMenu(); }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;