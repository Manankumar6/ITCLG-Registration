import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentRecords = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    const [editRow, setEditRow] = useState(null);

    const [savingId, setSavingId] = useState(null);

    // ====================================
    // FETCH RECORDS
    // ====================================

   useEffect(() => {

    const fetchRecords = async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/all-student-records`,
                {
                    withCredentials: true
                }
            );

            setRecords(res.data.records || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    fetchRecords();

}, [API_URL]);
    // ====================================
    // HANDLE CHANGE
    // ====================================

    const handleChange = (
        index,
        section,
        field,
        value
    ) => {

        const updated = [...records];

        // STUDENT FIELDS
        if (section === 'student') {

            updated[index].student[field] = value;
        }

        // THEORY
        else if (section === 'theoryExam') {

            updated[index].theoryExam.sem = value;
        }

        // ASSIGNMENTS
        else if (section === 'assignments') {

            updated[index].assignments[field] = value;
        }

        // NORMAL FIELDS
        else {

            updated[index][field] = value;
        }

        setRecords(updated);
    };

    // ====================================
    // SAVE RECORD
    // ====================================

    const handleSave = async (item) => {

        try {

            setSavingId(item._id);

            const payload = {

                resultId: item._id,

                // STUDENT
                studentObjectId: item.student?._id,
                studentId: item.student?.card,

                studentName: item.student?.name,
                fatherName: item.student?.fname,

                course: item.student?.course,
                session: item.student?.session,
                city: item.student?.city,

                // RESULT
                dob: item?.dob,
                serialNo: item?.serialNo,
                completionDate: item?.completionDate,

                theoryGrade:
                    item?.theoryExam?.sem,

                a1:
                    item?.assignments?.sem1,

                a2:
                    item?.assignments?.sem2,

                pProj:
                    item?.personalityProject,

                attendance:
                    item?.attendance,

                total:
                    item?.grandTotal,

                hasPCert:
                    item?.hasPersonalityCertificate
            };

            const res = await axios.post(
                `${API_URL}/api/save-result`,
                payload,
                {
                    withCredentials: true
                }
            );

            alert(res.data.message);

            setEditRow(null);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                'Update Failed'
            );

        } finally {

            setSavingId(null);
        }
    };

    // ====================================
    // FILTER
    // ====================================

    const filteredRecords = records.filter((item) => {

        const student = item.student;

        return (

            student?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            student?.card
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            student?.fname
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );
    });

    return (

        <div className="container-fluid py-4">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>

                    <h2 className="fw-bold mb-1 text-dark">
                        Student Certificate Records
                    </h2>

                    <p className="text-muted mb-0">
                        Manage all student records
                    </p>

                </div>

                <div
                    style={{
                        maxWidth: '350px',
                        width: '100%'
                    }}
                >

                    <input
                        type="text"
                        className="form-control shadow-sm"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* TABLE */}

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                <div className="bg-dark text-white px-4 py-3">

                    <h5 className="mb-0 fw-bold">
                        Student Database
                    </h5>

                </div>

                <div className="card-body p-0">

                    {loading ? (

                        <div className="text-center py-5">

                            <div className="spinner-border text-primary"></div>

                        </div>

                    ) : (

                        <div
                            className="table-responsive"
                            style={{
                                overflowX: 'auto',
                                whiteSpace: 'nowrap'
                            }}
                        >

                            <table
                                className="table table-hover align-middle mb-0"
                                style={{
                                    minWidth: '2400px'
                                }}
                            >

                                {/* HEAD */}

                                <thead
                                    className="text-center"
                                    style={{
                                        background: '#111827',
                                        color: '#fff'
                                    }}
                                >

                                    <tr>

                                        <th>#</th>
                                        <th>Photo</th>
                                        <th>Card</th>
                                        <th>Name</th>
                                        <th>Father</th>
                                        <th>Course</th>
                                        <th>Session</th>
                                        <th>City</th>
                                        <th>Serial</th>
                                        <th>DOB</th>
                                        <th>Completion</th>
                                        <th>Theory</th>
                                        <th>Sem1</th>
                                        <th>Sem2</th>
                                        <th>Project</th>
                                        <th>Attendance</th>
                                        <th>Total</th>
                                        <th>PD Cert.</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                {/* BODY */}

                                <tbody>

                                    {filteredRecords.length > 0 ? (

                                        filteredRecords.map((item, index) => {

                                            const student = item.student;

                                            return (

                                                <tr key={item._id}>

                                                    {/* INDEX */}

                                                    <td className="text-center fw-bold">

                                                        {index + 1}

                                                    </td>

                                                    {/* IMAGE */}

                                                    <td className="text-center">

                                                        <img
                                                            src={student?.image}
                                                            alt={student?.name}
                                                            className="rounded border"
                                                            style={{
                                                                width: '60px',
                                                                height: '60px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />

                                                    </td>

                                                    {/* CARD */}

                                                    <td>

                                                        <span className="badge bg-primary">

                                                            {student?.card}

                                                        </span>

                                                    </td>

                                                    {/* NAME */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                value={student?.name || ''}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'student',
                                                                        'name',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            <span className="fw-semibold">

                                                                {student?.name}

                                                            </span>

                                                        )}

                                                    </td>

                                                    {/* FATHER */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                value={student?.fname || ''}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'student',
                                                                        'fname',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            student?.fname

                                                        )}

                                                    </td>

                                                    {/* COURSE */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                value={student?.course || ''}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'student',
                                                                        'course',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            student?.course

                                                        )}

                                                    </td>

                                                    {/* SESSION */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                value={student?.session || ''}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'student',
                                                                        'session',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            student?.session

                                                        )}

                                                    </td>

                                                    {/* CITY */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                value={student?.city || ''}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'student',
                                                                        'city',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            student?.city

                                                        )}

                                                    </td>

                                                    {/* SERIAL */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                value={item?.serialNo || ''}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'normal',
                                                                        'serialNo',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            item?.serialNo || '-'

                                                        )}

                                                    </td>

                                                    {/* DOB */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="date"
                                                                className="form-control form-control-sm"
                                                                value={item?.dob || ''}
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'normal',
                                                                        'dob',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            item?.dob || '-'

                                                        )}

                                                    </td>

                                                    {/* COMPLETION */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="date"
                                                                className="form-control form-control-sm"
                                                                value={
                                                                    item?.completionDate
                                                                        ? item.completionDate.split('T')[0]
                                                                        : ''
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'normal',
                                                                        'completionDate',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            item?.completionDate
                                                                ? new Date(
                                                                    item.completionDate
                                                                ).toLocaleDateString()
                                                                : '-'

                                                        )}

                                                    </td>

                                                    {/* THEORY */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                value={
                                                                    item?.theoryExam?.sem || ''
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'theoryExam',
                                                                        'sem',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            <span className="badge bg-warning text-dark">

                                                                {item?.theoryExam?.sem || '-'}

                                                            </span>

                                                        )}

                                                    </td>

                                                    {/* SEM1 */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                value={
                                                                    item?.assignments?.sem1 || 0
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'assignments',
                                                                        'sem1',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            item?.assignments?.sem1 || 0

                                                        )}

                                                    </td>

                                                    {/* SEM2 */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                value={
                                                                    item?.assignments?.sem2 || 0
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'assignments',
                                                                        'sem2',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            item?.assignments?.sem2 || 0

                                                        )}

                                                    </td>

                                                    {/* PROJECT */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                value={
                                                                    item?.personalityProject || 0
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'normal',
                                                                        'personalityProject',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            item?.personalityProject || 0

                                                        )}

                                                    </td>

                                                    {/* ATTENDANCE */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                value={
                                                                    item?.attendance || 0
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'normal',
                                                                        'attendance',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            item?.attendance || 0

                                                        )}

                                                    </td>

                                                    {/* TOTAL */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                value={
                                                                    item?.grandTotal || 0
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'normal',
                                                                        'grandTotal',
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            <span className="badge bg-success">

                                                                {item?.grandTotal || 0}

                                                            </span>

                                                        )}

                                                    </td>

                                                    {/* CERT */}

                                                    <td className="text-center">

                                                        {editRow === item._id ? (

                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    item?.hasPersonalityCertificate || false
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        index,
                                                                        'normal',
                                                                        'hasPersonalityCertificate',
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />

                                                        ) : (

                                                            item?.hasPersonalityCertificate ? (

                                                                <span className="badge bg-success">

                                                                    Yes

                                                                </span>

                                                            ) : (

                                                                <span className="badge bg-secondary">

                                                                    No

                                                                </span>

                                                            )

                                                        )}

                                                    </td>

                                                    {/* ACTION */}

                                                    <td>

                                                        {editRow === item._id ? (

                                                            <div className="d-flex gap-2">

                                                                <button
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={() =>
                                                                        handleSave(item)
                                                                    }
                                                                    disabled={
                                                                        savingId === item._id
                                                                    }
                                                                >

                                                                    {
                                                                        savingId === item._id
                                                                            ? 'Saving...'
                                                                            : 'Save'
                                                                    }

                                                                </button>

                                                                <button
                                                                    className="btn btn-secondary btn-sm"
                                                                    onClick={() =>
                                                                        setEditRow(null)
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>

                                                            </div>

                                                        ) : (

                                                            <button
                                                                className="btn btn-dark btn-sm"
                                                                onClick={() =>
                                                                    setEditRow(item._id)
                                                                }
                                                            >
                                                                Edit
                                                            </button>

                                                        )}

                                                    </td>

                                                </tr>
                                            );
                                        })

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="19"
                                                className="text-center py-5"
                                            >

                                                No Records Found

                                            </td>

                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default StudentRecords;