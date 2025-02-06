import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
       <footer className="d-flex flex-wrap justify-content-evenly align-items-center py-3 border-top position-fixed w-100 bottom-0" style={{background:"#e3f2fd"}}>
        <div className="col-md-4 d-flex align-items-center">
        
          <span className="text-dark">Made With ♥ By Manan</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex text-dark">
          <li className="ms-3"><Link to='https://wa.me/qr/CE2NQOCPJFHBM1' target='_blank'><i className="fa-brands fa-whatsapp fa-xl" style={{ color: "#000" }}></i></Link></li>
          <li className="ms-3"><Link to='https://www.instagram.com/manankumar_06/?r=nametag' target='_blank'><i className="fa-brands fa-instagram fa-xl" style={{ color: "#000" }}></i></Link></li>
          <li className="ms-3"><Link to='https://github.com/Manankumar6/' target='_blank'><i className="fa-brands fa-github fa-xl" style={{ color: "#000" }}></i></Link></li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
