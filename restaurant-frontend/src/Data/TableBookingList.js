import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TableBookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings') // call backend API
      .then(res => {
        setBookings(res.data);
        console.log(res.data)
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading bookings...</p>;

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
