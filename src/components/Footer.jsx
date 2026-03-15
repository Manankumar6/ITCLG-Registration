import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="w-100 border-top position-fixed bottom-0"
      style={{
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
      }}
    >
      <div className="container py-1">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          
          {/* Left Side */}
          <div className="text-light small text-center text-md-start">
            Made with{" "}
            <span style={{ color: "#ff4d6d", fontSize: "18px" }}>♥</span>{" "}
            by <strong>Manan</strong> | Powered by{" "}
            <Link
              to="https://techcanva.in"
              target="_blank"
              style={{
                color: "#38bdf8",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              TechCanva
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="d-flex align-items-center gap-4">
            <Link to="https://techcanva.in" target="_blank">
              <img
                src="/image/techcanva.png"
                alt="TechCanva"
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  transition: "transform 0.3s",
                }}
                className="footer-icon"
              />
            </Link>

            <Link to="https://wa.me/qr/CE2NQOCPJFHBM1" target="_blank">
              <i className="fa-brands fa-whatsapp footer-social"></i>
            </Link>

            <Link
              to="https://www.instagram.com/manankumar_06/"
              target="_blank"
            >
              <i className="fa-brands fa-instagram footer-social"></i>
            </Link>

            <Link to="https://github.com/Manankumar6/" target="_blank">
              <i className="fa-brands fa-github footer-social"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;