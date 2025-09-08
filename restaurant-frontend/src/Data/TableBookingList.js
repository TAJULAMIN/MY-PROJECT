import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const handleEdit = (booking) => {
  // Save booking in localStorage for the Edit page
  localStorage.setItem("editBooking", JSON.stringify(booking));
  // Redirect to edit page
  window.location.href = `/edit-booking/${booking._id}`;
};

function TableBookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token"); // JWT from login
      const user = JSON.parse(localStorage.getItem("user"));

      // Redirect if no token or not admin
      if (!token || !user || user.role !== "admin") {
        navigate("/"); // redirect non-admin users
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(
          err.response?.data?.message || "Failed to fetch bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <h1>All Bookings</h1>
      <table
        style={{ borderCollapse: "collapse", width: "90%" }}
        border="5"
        cellPadding="10"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Branch</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.time}</td>
              <td>{booking.guests}</td>
              <td>{booking.branch}</td>
              <td>{new Date(booking.createdAt).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => handleEdit(booking)}
                  style={{
                    backgroundColor: "#FFA500",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableBookingList;
