import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const AdminAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("today");
  const [type, setType] = useState("today");

  const URL = process.env.REACT_APP_API_URL;

  const fetchAttendance = async (selectedFilter = "today") => {
    setLoading(true);

    try {
      const res = await fetch(
        `${URL}/api/getattendance?filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        if (data.type === "today") {
          setAttendance(data.attendance);
          setType("today");
        } else {
          setAttendance(data.data);
          setType("summary");
        }
      } else {
        toast.error(data.message);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching attendance");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance(filter);
  }, [filter]);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Student Attendance Records</h2>

      {/* FILTER BUTTONS */}

      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        <button
          className={`btn ${
            filter === "today" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("today")}
        >
          Today
        </button>

        <button
          className={`btn ${
            filter === "1month" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("1month")}
        >
          Last Month
        </button>

        <button
          className={`btn ${
            filter === "3months" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("3months")}
        >
          Last 3 Months
        </button>

        <button
          className={`btn ${
            filter === "6months" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("6months")}
        >
          Last 6 Months
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            {/* TODAY VIEW */}

            {type === "today" ? (
              <>
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Card ID</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.length > 0 ? (
                    attendance.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.student?.name}</td>
                        <td>{item.student?.card}</td>
                        <td>{item.student?.course}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>

                        <td>
                          <span
                            className={`badge ${
                              item.status === "present"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            ) : (
              /* SUMMARY VIEW */

              <>
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Card ID</th>
                    <th>Course</th>
                    <th>Total Days</th>
                    <th>Present Days</th>
                    <th>Attendance %</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.length > 0 ? (
                    attendance.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.student?.name}</td>
                        <td>{item.student?.card}</td>
                        <td>{item.student?.course}</td>
                        <td>{item.totalDays}</td>
                        <td>{item.presentDays}</td>

                        <td>
                          <span className="badge bg-info">
                            {item.percentage}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAttendance;