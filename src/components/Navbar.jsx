import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const Navbar = () => {
    const { isAuth, Logout } = useAuth();

    // Helper to close the menu on mobile after clicking a link
    const closeMenu = () => {
        const menu = document.getElementById('navbarNav');
        if (menu && menu.classList.contains('show')) {
            new window.bootstrap.Collapse(menu).hide();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-blue sticky-top shadow-sm py-3" style={{ opacity: "0.95" }}>
            {/* Using a column-based flex container to easily stack the elements */}
            <div className="container-fluid px-3 px-md-5 d-flex flex-column align-items-stretch gap-3">
                
                {/* ROW 1: Logo & Company Name (and Mobile Toggler) */}
                <div className="d-flex justify-content-between justify-content-lg-center align-items-center w-100 position-relative">
                    
                    <NavLink to={'/'} className="navbar-brand d-flex align-items-center m-0" onClick={closeMenu}>
                        <img
                            src='/image/logo.jpeg'
                            alt='logo'
                            className="rounded-circle me-2"
                            style={{ width: "45px", height: "45px", objectFit: "cover", border: "2px solid white" }}
                        />
                        <span className="text-light fw-bold fs-5 text-nowrap">IT Computer Education World</span>
                    </NavLink>

                    {/* Mobile Toggler Button (Kept layout-safe on mobile screens) */}
                    <button
                        className="navbar-toggler border-white ms-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                    </button>
                </div>

                {/* ROW 2: Separate Navlinks Row (Full Width) */}
                <div className="collapse navbar-collapse w-100" id="navbarNav">
                    {/* - `w-100` makes it full width
                        - `justify-content-center` centers all links cleanly underneath the logo row
                        - `flex-wrap` keeps it completely safe on tablet screen views
                    */}
                    <ul className="navbar-nav d-flex flex-row flex-wrap justify-content-center align-items-center gap-3 mt-2 mt-lg-0 w-100 border-top border-white/10 pt-2 pt-lg-0 border-lg-0">
                        <li className="nav-item">
                            <NavLink to='/about' className="nav-link text-light px-2 text-nowrap" onClick={closeMenu}>About</NavLink>
                        </li>

                        {isAuth && (
                            <>
                                <li className="nav-item">
                                    <NavLink to='/register' className="nav-link text-light px-2 text-nowrap" onClick={closeMenu}>Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/attendance' className="nav-link text-light px-2 text-nowrap" onClick={closeMenu}>Attendance Portal</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/attendancerecord' className="nav-link text-light px-2 text-nowrap" onClick={closeMenu}>Attendance Record</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/studentrecord-update' className="nav-link text-light px-2 text-nowrap" onClick={closeMenu}>Records</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/certificateview' className="nav-link text-light px-2 text-nowrap" onClick={closeMenu}>Verify Certificates</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/certificaterecord' className="nav-link text-light px-2 text-nowrap" onClick={closeMenu}>Certificates Record</NavLink>
                                </li>
                                <li className="nav-item ms-2 my-1 my-lg-0">
                                    <button 
                                        className="btn btn-sm btn-danger px-3 rounded-pill shadow-sm text-nowrap" 
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