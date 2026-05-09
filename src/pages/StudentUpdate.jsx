import React, { useState } from 'react';
import axios from 'axios';

const StudentUpdate = () => {
    const URL = process.env.REACT_APP_API_URL;

    // --- Basic States ---
    const [cardId, setCardId] = useState('');
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);

    // --- Form States for Result Model ---
    const [dob, setDob] = useState('');
    const [serial, setSerial] = useState('');
    const [compDate, setCompDate] = useState('');
    const [theoryGrade, setTheoryGrade] = useState('');
    const [a1, setA1] = useState(0);
    const [a2, setA2] = useState(0);
    const [pProj, setPProj] = useState(0);
    const [att, setAtt] = useState(0);
    const [total, setTotal] = useState(0);
    const [givePCert, setGivePCert] = useState(false);

    // Search for Student
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${URL}/api/getstudent`, { cardId });
            setStudent(response.data.student);
        } catch (error) {
            alert(error.response?.data?.message || "Record Not Found");
            setStudent(null);
        } finally {
            setLoading(false);
        }
    };

    // Submit Result Data
    const handleResultSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            studentObjectId: student._id, // Internal Reference
            studentId: student.card,      // Admin Input Reference
            dob,
            serialNo: serial,
            completionDate: compDate,
            theoryGrade,
            a1,
            a2,
            pProj,
            attendance: att,
            total,
            hasPCert: givePCert
        };

        try {
            const res = await axios.post(`${URL}/api/save-result`, payload,{
            // THIS IS THE MISSING PIECE
            withCredentials: true 
        });
            alert(res.data.message);
            // Optional: Reset form or redirect
        } catch (error) {
            alert(error.response?.data?.message || "Error saving records");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <h2 className="text-center mb-4 fw-bold">Student Records Portal</h2>

                    {/* Search Bar */}
                    <div className="card shadow-sm mb-4 border-primary">
                        <div className="card-body">
                            <form onSubmit={handleSearch} className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Student Card ID (e.g. 46420)"
                                    value={cardId}
                                    onChange={(e) => setCardId(e.target.value)}
                                    required
                                />
                                <button className="btn btn-primary px-4" type="submit" disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm"></span> : "Find Student"}
                                </button>
                                {student && (
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => {setStudent(null); setCardId('');}}>
                                        Clear
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Student Profile & Result Form */}
                    {student && (
                        <div className="card shadow border-0 overflow-hidden">
                            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
                                <h5 className="mb-0">Academic Profile: {student.name}</h5>
                                <span className="badge bg-info text-dark">ID: {student.card}</span>
                            </div>

                            <div className="card-body bg-white">
                                <div className="row align-items-center">
                                    <div className="col-md-3 text-center mb-3 mb-md-0">
                                        <img
                                            src={student.image}
                                            alt={student.name}
                                            className="img-fluid rounded border shadow-sm"
                                            style={{ maxHeight: '150px', width: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row g-2">
                                            <div className="col-6"><small className="text-muted">Father:</small> <p className="mb-1 fw-bold">{student.fname}</p></div>
                                            <div className="col-6"><small className="text-muted">Course:</small> <p className="mb-1 fw-bold">{student.course}</p></div>
                                            <div className="col-6"><small className="text-muted">Session:</small> <p className="mb-1 fw-bold">{student.session}</p></div>
                                            <div className="col-6"><small className="text-muted">City:</small> <p className="mb-1 fw-bold">{student.city}</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body bg-light border-top p-4">
                                <h4 className="mb-4 text-secondary border-start border-4 border-primary ps-2">Academic Data Entry</h4>
                                <form onSubmit={handleResultSubmit}>
                                    
                                    {/* Section 1: Certificate Basics */}
                                    <h6 className="text-primary fw-bold mb-3">1. General Information</h6>
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-4">
                                            <label className="form-label small">Date of Birth</label>
                                            <input type="date" className="form-control" onChange={(e) => setDob(e.target.value)} required />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">Serial Number</label>
                                            <input type="text" className="form-control" placeholder="SR-2026-001" onChange={(e) => setSerial(e.target.value)} required />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">Completion Date</label>
                                            <input type="date" className="form-control" onChange={(e) => setCompDate(e.target.value)} required />
                                        </div>
                                    </div>

                                    {/* Section 2: Marksheet */}
                                    <h6 className="text-primary fw-bold mb-3">2. Performance & Grades</h6>
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-4">
                                            <label className="form-label small">Theory Grade (Combined)</label>
                                            <input type="text" className="form-control" placeholder="e.g. A+" onChange={(e) => setTheoryGrade(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">Assignment Sem 1</label>
                                            <input type="number" className="form-control" placeholder="0" onChange={(e) => setA1(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">Assignment Sem 2</label>
                                            <input type="number" className="form-control" placeholder="0" onChange={(e) => setA2(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">Personality Project</label>
                                            <input type="number" className="form-control" placeholder="0" onChange={(e) => setPProj(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small">Attendance</label>
                                            <input type="number" className="form-control" placeholder="0" onChange={(e) => setAtt(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold">Grand Total</label>
                                            <input type="number" className="form-control border-primary" placeholder="Total Marks" onChange={(e) => setTotal(e.target.value)} />
                                        </div>
                                    </div>

                                    {/* Optional Toggle */}
                                    <div className="form-check form-switch mb-4 p-3 bg-white rounded shadow-sm border">
                                        <input
                                            className="form-check-input ms-0 me-2"
                                            type="checkbox"
                                            id="pCert"
                                            onChange={(e) => setGivePCert(e.target.checked)}
                                        />
                                        <label className="form-check-label fw-bold" htmlFor="pCert">
                                            Issue Personality Development Certificate
                                        </label>
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-dark btn-lg shadow">
                                            Save Records & Prepare Certificates
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentUpdate;