import React, { useState } from 'react';
import axios from 'axios';


const StudentUpdate = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    // --- Basic States ---
    const [cardId, setCardId] = useState('');
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
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
            const response = await axios.post(`${API_URL}/api/getstudent`, { cardId });
            const data = response.data;

            setStudent(data.student);

            if (data.result) {

                // DOB
                setDob(data.result.dob || '');

                // Serial
                setSerial(data.result.serialNo || '');

                // Completion Date
                setCompDate(
                    data.result.completionDate
                        ? data.result.completionDate.split('T')[0]
                        : ''
                );

                // Theory Grade
                setTheoryGrade(
                    data.result.theoryExam?.sem || ''
                );

                // Assignment Marks
                setA1(
                    data.result.assignments?.sem1 || 0
                );

                setA2(
                    data.result.assignments?.sem2 || 0
                );

                // Personality Project
                setPProj(
                    data.result.personalityProject || 0
                );

                // Attendance
                setAtt(
                    data.result.attendance || 0
                );

                // Grand Total
                setTotal(
                    data.result.grandTotal || 0
                );

                // Personality Certificate
                setGivePCert(
                    data.result.hasPersonalityCertificate || false
                );

            } else {

                // Reset Form
                setDob('');
                setSerial('');
                setCompDate('');
                setTheoryGrade('');
                setA1(0);
                setA2(0);
                setPProj(0);
                setAtt(0);
                setTotal(0);
                setGivePCert(false);
            }
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

            studentName: student.name,
            fatherName: student.fname,
            
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
            const res = await axios.post(`${API_URL}/api/save-result`, payload, {
                // THIS IS THE MISSING PIECE
                withCredentials: true
            });
            alert(res.data.message);
            // Optional: Reset form or redirect
        } catch (error) {
            alert(error.response?.data?.message || "Error saving records");
        }
    };

    const handleImageUpdate = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        // Check File Size
        const fileSizeKB = file.size / 1024;

        // Limit 40KB
        if (fileSizeKB > 40) {

            alert("Image size should be less than 40KB");

            return;
        }

        // Preview Image
        const render = new FileReader();

        render.readAsDataURL(file);

        render.onload = async () => {

            // Local Preview
            setPreviewImage(render.result);

            try {

                const res = await axios.post(
                    `${API_URL}/api/update-student-image`,
                    {
                        studentId: student._id,
                        image: render.result
                    },
                    {
                        withCredentials: true
                    }
                );

                // Update Student Image
                setStudent({
                    ...student,
                    image: res.data.image
                });

                // Remove Preview After Save
                setPreviewImage('');

                alert("Image Updated Successfully");

            } catch (error) {

                alert(
                    error.response?.data?.message ||
                    "Upload Failed"
                );
            }
        };
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
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => { setStudent(null); setCardId(''); }}>
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
                                <div className="w-100">

                                    <small className="text-light">
                                        Student Name
                                    </small>

                                    <input
                                        type="text"
                                        className="form-control fw-bold w-50"
                                        value={student.name || ''}
                                        onChange={(e) =>
                                            setStudent({
                                                ...student,
                                                name: e.target.value
                                            })
                                        }
                                    />
                                </div>
                                <span className="badge bg-info text-dark">ID: {student.card}</span>
                            </div>

                            <div className="card-body bg-white">
                                <div className="row align-items-center">
                                    <div className="col-md-3 text-center mb-3 mb-md-0">
                                        <img
                                            src={previewImage || student.image}
                                            alt={student.name}
                                            className="img-fluid rounded border shadow-sm"
                                            style={{
                                                maxHeight: '150px',
                                                width: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImageUpdate}
                                        />
                                    </div>

                                    <div className="col-md-9">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <small className="text-muted">Father:</small>
                                                <input
                                                    type="text"
                                                    className="form-control fw-bold"
                                                    value={student.fname || ''}
                                                    onChange={(e) =>
                                                        setStudent({
                                                            ...student,
                                                            fname: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className="col-6">
                                                <small className="text-muted">Course:</small>
                                                <p className="mb-1 fw-bold">{student.course}</p>
                                            </div>

                                            <div className="col-6">
                                                <small className="text-muted">Session:</small>
                                                <p className="mb-1 fw-bold">{student.session}</p>
                                            </div>

                                            <div className="col-6">
                                                <small className="text-muted">City:</small>
                                                <p className="mb-1 fw-bold">{student.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body bg-light border-top p-4">
                                <h4 className="mb-4 text-secondary border-start border-4 border-primary ps-2">
                                    Academic Data Entry
                                </h4>

                                <form onSubmit={handleResultSubmit}>

                                    {/* Section 1 */}
                                    <h6 className="text-primary fw-bold mb-3">
                                        1. General Information
                                    </h6>

                                    <div className="row g-3 mb-4">

                                        {/* DOB */}
                                        <div className="col-md-4">
                                            <label className="form-label small">
                                                Date of Birth
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {/* Serial */}
                                        <div className="col-md-4">
                                            <label className="form-label small">
                                                Serial Number
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="SR-2026-001"
                                                value={serial}
                                                onChange={(e) => setSerial(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {/* Completion Date */}
                                        <div className="col-md-4">
                                            <label className="form-label small">
                                                Completion Date
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                value={compDate}
                                                onChange={(e) => setCompDate(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Section 2 */}
                                    <h6 className="text-primary fw-bold mb-3">
                                        2. Performance & Grades
                                    </h6>

                                    <div className="row g-3 mb-4">

                                        {/* Theory Grade */}
                                        <div className="col-md-4">
                                            <label className="form-label small">
                                                Theory Grade (Combined)
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. A+"
                                                value={theoryGrade}
                                                onChange={(e) => setTheoryGrade(e.target.value)}
                                            />
                                        </div>

                                        {/* Assignment 1 */}
                                        <div className="col-md-4">
                                            <label className="form-label small">
                                                Assignment Sem 1
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0"
                                                value={a1}
                                                onChange={(e) => setA1(e.target.value)}
                                            />
                                        </div>

                                        {/* Assignment 2 */}
                                        <div className="col-md-4">
                                            <label className="form-label small">
                                                Assignment Sem 2
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0"
                                                value={a2}
                                                onChange={(e) => setA2(e.target.value)}
                                            />
                                        </div>

                                        {/* Personality Project */}
                                        <div className="col-md-4">
                                            <label className="form-label small">
                                                Personality Project
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0"
                                                value={pProj}
                                                onChange={(e) => setPProj(e.target.value)}
                                            />
                                        </div>

                                        {/* Attendance */}
                                        <div className="col-md-4">
                                            <label className="form-label small">
                                                Attendance
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0"
                                                value={att}
                                                onChange={(e) => setAtt(e.target.value)}
                                            />
                                        </div>

                                        {/* Total */}
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold">
                                                Grand Total
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control border-primary"
                                                placeholder="Total Marks"
                                                value={total}
                                                onChange={(e) => setTotal(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Checkbox */}
                                    <div className="form-check form-switch mb-4 p-3 bg-white rounded shadow-sm border">

                                        <input
                                            className="form-check-input ms-0 me-2"
                                            type="checkbox"
                                            id="pCert"
                                            checked={givePCert}
                                            onChange={(e) =>
                                                setGivePCert(e.target.checked)
                                            }
                                        />

                                        <label
                                            className="form-check-label fw-bold"
                                            htmlFor="pCert"
                                        >
                                            Issue Personality Development Certificate
                                        </label>
                                    </div>

                                    <div className="d-grid">
                                        <button
                                            type="submit"
                                            className="btn btn-dark btn-lg shadow"
                                        >
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