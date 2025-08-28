import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookTable = () => {
  const [formData, setFormData] = useState({
    branch: "",
    name: "",
    email: "",
    date: "",
    time: "",
    guests: ""
  });

  const [errors, setErrors] = useState({});

  // ✅ handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- validation ---
    const validationErrors = {
      branch: formData.branch ? "" : "Please select a branch.",
      name: formData.name
        ? formData.name.length > 50
          ? "Name should not exceed 50 characters."
          : ""
        : "Name is required.",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ""
        : "Invalid email address.",
      date:
        new Date(formData.date) >= new Date().setHours(0, 0, 0, 0)
          ? ""
          : "Date cannot be in the past.",
      time: formData.time ? "" : "Time is required.",
      guests:
        parseInt(formData.guests, 10) >= 1 &&
        parseInt(formData.guests, 10) <= 20
          ? ""
          : "Guests should be between 1 and 20."
    };

    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      return;
    }

    // --- send to backend ---
    try {
      await axios.post("http://localhost:5000/api/book-table", formData);
      toast.success("Table booked successfully!");
      setFormData({
        branch: "",
        name: "",
        email: "",
        date: "",
        time: "",
        guests: ""
      });
      setErrors({});
    } catch (error) {
      console.error("Error booking the table:", error);
      toast.error("Error booking the table. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Book a Table</h2>
      <form onSubmit={handleSubmit}>
        {/* Branch */}
        <label>Branch</label>
        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
        >
          <option value="">-- Select Branch --</option>
          <option value="Swabi">Swabi</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
        </select>
        {errors.branch && <p style={{ color: "red" }}>{errors.branch}</p>}

        {/* Name */}
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        {/* Date */}
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}

        {/* Time */}
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        {errors.time && <p style={{ color: "red" }}>{errors.time}</p>}

        {/* Guests */}
        <label>Guests</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
        />
        {errors.guests && <p style={{ color: "red" }}>{errors.guests}</p>}

        {/* Submit */}
        <button type="submit" style={{ marginTop: "10px" }}>
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookTable;
