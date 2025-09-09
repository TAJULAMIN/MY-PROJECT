import { Button } from "@mui/material";  // make sure this is at the top
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  // ➕ Add this function inside TableBookingList (below handleEdit is fine)
const handleDelete = (id) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this booking?</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF5722",
              color: "white",
              "&:hover": { backgroundColor: "#E64A19" },
            }}
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setBookings((prev) => prev.filter((b) => b._id !== id));
                toast.success("Booking deleted successfully!");
                closeToast();
              } catch (err) {
                toast.error("Failed to delete booking");
              }
            }}
          >
            Yes, Delete
          </Button>

          <Button
            variant="outlined"
            sx={{
              color: "#FF5722",
              borderColor: "#FF5722",
              "&:hover": { borderColor: "#E64A19", color: "#E64A19" },
            }}
            onClick={closeToast}
          >
            Cancel
          </Button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};



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
  <Button
  variant="contained"
  sx={{
    backgroundColor: "#FFA500",
    color: "white",
    "&:hover": { backgroundColor: "#E68900" },
    marginRight: "5px"
  }}
  onClick={() => handleEdit(booking)}
>
  Edit
  </Button>


   {/* ➕ New Delete button */}
  <Button
  variant="contained"
  sx={{
    backgroundColor: "#FF5722",
    color: "white",
    "&:hover": { backgroundColor: "#E64A19" }
  }}
  onClick={() => handleDelete(booking._id)}
>
  Delete
</Button>

</td>

              
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />

    </div>
  );
}

export default TableBookingList;
