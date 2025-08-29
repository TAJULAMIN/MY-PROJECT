import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TableBookingList() {   // 👉 pass the logged-in user here
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");   // 👉 new state for errors

    // ✅ get logged in user from localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    
    // 👉 Check if this user is the admin
    if (user?.email === "admin@gmail.com") {
      axios.get('http://localhost:5000/api/bookings')
        .then(res => {
          setBookings(res.data);
          
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setError("Failed to load bookings");
          setLoading(false);
        });
    } else {
      setError("You are not allowed to view bookings");
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;   // 👉 show error if not admin

  return (
    <div style={{
      display: 'flex',        // use flex layout
      flexDirection: 'column', // vertical stacking
      alignItems: 'center',   // center horizontally
      marginTop: '20px'       // spacing from top
    }}>
      <h1>All Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '90%' }} border="5" cellPadding="10" cellSpacing="0">
          
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Branch</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>{booking.branch}</td>
                <td>{new Date(booking.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableBookingList;
