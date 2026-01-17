import React from 'react';

const Warning = () => {
  // Enhanced Glassmorphism with a subtle red border tint
  const glassStyle = {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    borderRadius: '1.5rem'
  };

  const bgGradient = {
    background: 'radial-gradient(circle at center, #1a0a0a 0%, #020617 100%)',
    minHeight: '100vh'
  };

  return (
    <div style={bgGradient} className="d-flex align-items-center justify-content-center px-3">
      <div className="container" style={{ maxWidth: '580px' }}>
        
        {/* Main Card */}
        <div className="card shadow-2xl text-white border-0" style={glassStyle}>
          
          {/* Top Urgent Accent - Animated Gradient */}
          <div className="w-100" style={{ 
            height: '6px', 
            background: 'linear-gradient(90deg, #991b1b, #dc2626, #991b1b)',
            backgroundSize: '200% auto'
          }}></div>

          <div className="card-body p-4 p-md-5 text-center">
            
            {/* Critical Alert Icon */}
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10 mb-4" 
                 style={{ width: '90px', height: '90px', border: '2px dashed rgba(220, 38, 38, 0.4)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" className="bi bi-shield-lock-fill text-danger" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24c.304-.143.662-.352 1.048-.625a11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.262 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5"/>
              </svg>
            </div>

            {/* Content */}
            <h1 className="display-6 fw-bold mb-3 tracking-tight">Service Suspended</h1>
            
            <p className="text-secondary mb-4 fs-5" style={{ color: '#cbd5e1 !important' }}>
              Access has been <span className="text-danger fw-bold">revoked</span> because your 
              <span className="text-white font-monospace"> server subscription</span> has expired.
            </p>

            {/* Error Details Box */}
            <div className="bg-danger bg-opacity-10 rounded-4 p-4 mb-4 border border-danger border-opacity-10 text-start">
              <div className="d-flex align-items-center mb-3">
                <span className="badge rounded-pill bg-danger me-2" style={{ width: '10px', height: '10px', padding: 0 }}> </span>
                <span className="small text-uppercase fw-bold text-danger tracking-widest" style={{ fontSize: '0.75rem' }}>Account Notice</span>
              </div>
              <p className="small text-secondary mb-0">
                All scheduled tasks and public access for <span className="text-light fw-semibold">TechCanva</span> services are currently offline. Please resolve billing to restore data flow.
              </p>
            </div>

            {/* Buttons */}
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <button className="btn btn-danger px-4 py-3 fw-bold flex-grow-1 shadow-lg border-0 transition-all" style={{ letterSpacing: '0.5px' }}>
                Renew Plan Now
              </button>
              <button className="btn btn-outline-secondary px-4 py-3 fw-medium text-white border-secondary opacity-75">
                Billing Support
              </button>
            </div>

          </div>

          {/* Critical Status Footer */}
          <div className="card-footer border-top border-danger border-opacity-10 py-3 px-4 d-flex justify-content-between align-items-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="d-flex align-items-center text-danger">
              <span className="position-relative d-flex h-2 w-2 me-3">
                <span className="position-absolute h-100 w-100 rounded-circle bg-danger opacity-75 animate-ping"></span>
                <span className="position-relative rounded-circle bg-danger" style={{ width: '8px', height: '8px' }}></span>
              </span>
              <span className="small fw-black text-uppercase tracking-tighter" style={{ fontSize: '0.7rem' }}>
                System Lock Active
              </span>
            </div>
            <code className="text-danger opacity-50 small" style={{ fontSize: '0.7rem' }}>
              ERR_AUTH_EXPIRED
            </code>
          </div>

        </div>

        {/* Brand Link */}
        <div className="text-center mt-4">
            <p className="text-secondary small">
              Managed by <span className="text-white opacity-75 fw-bold text-decoration-none">TechCanva Cloud Services</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Warning;