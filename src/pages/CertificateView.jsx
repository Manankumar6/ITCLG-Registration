import React, {  useState, useRef } from 'react';
import axios from 'axios';

import html2canvas from 'html2canvas';

const CertificateView = () => {
  const [cardId, setCardId] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Separate refs for each document
    const diplomaRef = useRef(null);
    const marksheetRef = useRef(null);
    const pdRef = useRef(null);
    
    const URL = process.env.REACT_APP_API_URL;

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.get(`${URL}/api/get-certificate/${cardId}`, { withCredentials: true });
            setData(res.data);
        } catch (err) {
            alert("Record not found for this Card ID.");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    // New Function to download everything
    const downloadAll = async () => {
        const certificates = [
            { ref: diplomaRef, name: 'Diploma' },
            { ref: marksheetRef, name: 'Marksheet' },
            { ref: pdRef, name: 'PD_Certificate' }
        ];

        for (const cert of certificates) {
            if (cert.ref.current) {
                const canvas = await html2canvas(cert.ref.current, { useCORS: true, scale: 3 });
                const link = document.createElement('a');
                link.download = `${cert.name}_${data.student.name}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                // Small timeout to prevent browser from blocking multiple downloads
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4 fw-bold">Verify Certificate </h2>

            {/* --- Search Section --- */}
            <div className="row justify-content-center mb-5">
                <div className="col-md-6">
                    <form onSubmit={handleSearch} className="input-group shadow-sm">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Card ID (e.g. 46420)"
                            value={cardId}
                            onChange={(e) => setCardId(e.target.value)}
                            required
                        />
                        <button className="btn btn-primary px-4" type="submit" disabled={loading}>
                            {loading ? "Searching..." : "Generate View"}
                        </button>
                    </form>
                </div>
            </div>

            {/* --- Certificate Display & Download --- */}
            {data && (
                <div className="text-center animate__animated animate__fadeIn">
                    <div className="mb-4">
                        <button className="btn btn-success btn-lg px-5 shadow" onClick={downloadAll}>
                            <i className="bi bi-download me-2"></i> Download Digital Certificate
                        </button>
                    </div>

                    {/* The Certificate Wrapper (Scrollable on mobile) */}
                    <div className="d-flex justify-content-center overflow-auto pb-4">
                        <div
                           ref={diplomaRef}
                            style={{
                                position: 'relative',
                                width: '1000px',
                                height: '708px',
                                backgroundImage: `url('/image/certificate-template.jpg')`, // Ensure this image is in your public folder
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: '#fff',
                                fontFamily: "'Times New Roman', Times, serif",
                                color: '#000',
                                flexShrink: 0
                            }}
                        >
                            {/* 1. Main Name */}
                            <div style={{ position: 'absolute', top: '28%', left: '50%', transform: 'translateX(-50%)', fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a' }}>
                                {data.student.name}
                            </div>
                            <div style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translateX(-50%)', fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a' }}>
                                Advance Diploma in Information Technology
                            </div>

                            {/* 2. Main Grade (Center) */}
                            <div style={{ position: 'absolute', top: '47%', left: '52%', transform: 'translateX(-50%)', fontSize: '24px', fontWeight: 'bold', fontStyle: 'italic' }}>
                                {data.theoryExam.sem}
                            </div>

                            {/* 3. Student Photo */}
                            <div style={{ position: 'absolute', top: '24.8%', right: '16.2%', width: '108px', height: '123px', border: '1px solid #ddd' }}>
                                <img src={data.student.image} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            {/* 4. Details Table Row 1 */}
                            {/* Father Name */}
                            <div style={{ position: 'absolute', top: '55%', left: '26.5%', fontSize: '15px', fontWeight: '500' }}>
                                {data.student.fname}
                            </div>
                            {/* DOB */}
                            <div style={{ position: 'absolute', top: '55%', left: '59%', fontSize: '15px' }}>
                                {data.dob}
                            </div>
                            {/* Serial No */}
                            <div style={{ position: 'absolute', top: '55%', left: '77%', fontSize: '13px' }}>
                                {data.serialNo}
                            </div>

                            {/* 5. Details Table Row 2 */}
                            {/* Duration */}
                            <div style={{ position: 'absolute', top: '58.5%', left: '26.5%', fontSize: '15px' }}>
                                {data.duration}
                            </div>
                            {/* Completion Date */}
                            <div style={{ position: 'absolute', top: '58.5%', left: '59%', fontSize: '15px' }}>
                                {new Date(data.completionDate).toLocaleDateString('en-GB')}
                            </div>
                            {/* Place */}
                            <div style={{ position: 'absolute', top: '58.5%', left: '78%', fontSize: '15px' }}>
                                {data.student.city}
                            </div>

                            {/* 6. Footer Row */}


                            {/* Student ID (Card ID) */}
                            <div style={{ position: 'absolute', top: '70%', left: '78%', fontSize: '16px', fontWeight: 'bold' }}>
                                {data.studentId}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center overflow-auto pb-4">
                        <div
                           ref={marksheetRef}
                            style={{
                                position: 'relative',
                                width: '708px',
                                height: '1000px',
                                backgroundImage: `url('/image/marksheet.jpg')`,
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: '#fff',
                                fontFamily: "'Times New Roman', Times, serif",
                                color: '#000',
                                flexShrink: 0
                            }}
                        >
                            {/* --- TOP HEADER DETAILS --- */}
                            {/* Branch */}
                            <div style={{ position: 'absolute', top: '27.5%', left: '12%', transform: 'translateX(-50%)', fontSize: '11px' }}>
                                {data.student.city}
                            </div>
                            {/* Serial No */}
                            <div style={{ position: 'absolute', top: '27.5%', left: '23.5%', transform: 'translateX(-50%)', fontSize: '11px' }}>
                                {data.serialNo}
                            </div>
                            {/* Student ID */}
                            <div style={{ position: 'absolute', top: '27.5%', left: '37.5%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: 'bold' }}>
                                {data.studentId}
                            </div>
                            {/* Student Name */}
                            <div style={{ position: 'absolute', top: '27.5%', left: '55%', transform: 'translateX(-50%)', fontSize: '11px', fontWeight: 'bold' }}>
                                {data.student.name}
                            </div>
                            {/* Father Name */}
                            <div style={{ position: 'absolute', top: '27.5%', left: '74%', transform: 'translateX(-50%)', fontSize: '11px' }}>
                                {data.student.fname}
                            </div>
                            {/* Year */}
                            <div style={{ position: 'absolute', top: '27.5%', left: '88%', transform: 'translateX(-50%)', fontSize: '11px' }}>
                                {new Date(data.completionDate).getFullYear()}
                            </div>

                            {/* --- MARKS TABLE SECTION --- */}
                            {/* 1. Theory Exam Grade */}
                            <div style={{ position: 'absolute', top: '40.8%', left: '72%', transform: 'translateX(-50%)', fontSize: '16px', fontWeight: 'bold' }}>
                                {data.theoryExam.sem}
                            </div>

                            {/* 2. Assignment Sem 1 */}
                            <div style={{ position: 'absolute', top: '44.8%', left: '72%', transform: 'translateX(-50%)', fontSize: '16px' }}>
                                {data.assignments.sem1}
                            </div>

                            {/* 3. Assignment Sem 2 */}
                            <div style={{ position: 'absolute', top: '48.8%', left: '72%', transform: 'translateX(-50%)', fontSize: '16px' }}>
                                {data.assignments.sem2}
                            </div>

                            {/* 4. Personality Project */}
                            <div style={{ position: 'absolute', top: '53.2%', left: '72%', transform: 'translateX(-50%)', fontSize: '16px' }}>
                                {data.personalityProject}
                            </div>

                            {/* 5. Attendance */}
                            <div style={{ position: 'absolute', top: '57.2%', left: '72%', transform: 'translateX(-50%)', fontSize: '16px' }}>
                                {data.attendance}
                            </div>

                            {/* --- TOTALS & SUMMARY --- */}
                            {/* Grand Total */}
                            <div style={{ position: 'absolute', top: '61%', left: '72%', transform: 'translateX(-50%)', fontSize: '18px', fontWeight: 'bold' }}>
                                {data.grandTotal}
                            </div>

                            {/* Final Grade (Bottom Box) */}
                            <div style={{ position: 'absolute', top: '44.5%', right: '12%', transform: 'translateX(-50%)', fontSize: '16px', fontWeight: 'bold' }}>
                                {Number(data.assignments.sem1) >= 45 ? "D" : ""}
                            </div>

                            {/* Attendance (Bottom Box) */}
                            <div style={{ position: 'absolute', top: '48.5%', right: '12%', transform: 'translateX(-50%)', fontSize: '16px' }}>
                                {Number(data.assignments.sem2) >= 45 ? "D" : ""}
                            </div>

                            {/* 4. Personality Development Remark - Condition: Check if hasPersonalityCertificate is true */}
                            <div style={{ position: 'absolute', top: '52.8%', right: '12%', transform: 'translateX(-50%)', fontSize: '16px' }}>
                                {Number(data?.personalityProject) >= 20 ? "P" : "Re"}
                            </div>

                            {/* --- QR CODE & SIGNATURE AREA --- */}
                            {/* You can add a QR code here if you have a URL for it */}
                            <div style={{ position: 'absolute', bottom: '7.5%', left: '8.5%', width: '110px', height: '110px' }}>
                                {/* Optional: <QRCode value={`https://itcew.org/verify/${data.studentId}`} size={110} /> */}
                            </div>

                        </div>
                    </div>
                   {data.hasPersonalityCertificate && <div className="d-flex justify-content-center overflow-auto pb-4">
                        <div
                           ref={pdRef}
                            style={{
                                position: 'relative',
                                width: '708px',
                                height: '1000px',
                                backgroundImage: `url('/image/pd.jpg')`,
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: '#fff',
                                fontFamily: "'Times New Roman', Times, serif",
                                color: '#000',
                                flexShrink: 0
                            }}
                        >
                            {/* --- TOP LEFT DETAILS --- */}
                            {/* User ID / Student ID */}
                            <div style={{ position: 'absolute', top: '23.4%', left: '17%', fontSize: '15px', fontWeight: 'bold' }}>
                                {data.studentId}
                            </div>

                            {/* City */}
                            <div style={{ position: 'absolute', top: '25.2%', left: '16%', fontSize: '15px' }}>
                                {data.student.city}
                            </div>

                            {/* --- MAIN CENTER SECTION --- */}
                            {/* Student Name (The "Is hereby granted to" section) */}
                            <div style={{
                                position: 'absolute',
                                top: '35.5%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontSize: '32px',
                                fontWeight: 'bold',
                                color: '#1a1a1a',
                                width: '80%',
                                textAlign: 'center'
                            }}>
                                {data.student.name}
                            </div>

                            {/* --- AWARDED DATE --- */}
                            {/* Awarded on - Date of Completion */}
                            <div style={{ position: 'absolute', top: '65.7%', left: '61%', transform: 'translateX(-50%)', fontSize: '18px', fontWeight: 'bold' }}>
                                {new Date(data.completionDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>

                            {/* --- STUDENT PHOTO --- */}
                            {/* Profile Image (Top Right Box) */}
                            <div style={{ position: 'absolute', top: '19%', right: '7%', width: '118px', height: '142px', border: '1px solid #ddd' }}>
                                <img src={data.student.image} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            {/* --- FOOTER SECTION --- */}
                            {/* Optional QR Code placement if you generate one */}
                            <div style={{ position: 'absolute', bottom: '6.5%', left: '9%', width: '105px', height: '105px' }}>
                                {/* If using a library: <QRCode value={`https://itcew.org/v/${data.studentId}`} size={105} /> */}
                            </div>

                        </div>
                    </div>}
                </div>
            )}
        </div>
    );
};

export default CertificateView;